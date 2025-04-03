
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toKebabCase } from '@/utils/stringUtils';

interface RecentPostsProps {
  currentPostId: string;
  limit?: number;
}

const RecentPosts = ({ currentPostId, limit = 3 }: RecentPostsProps) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        
        // Fetch legacy blog posts
        const { data: legacyPosts } = await supabase
          .from('blog_posts')
          .select('id, title_en, title_es, excerpt_en, excerpt_es, cover_image, date, slug')
          .neq('id', currentPostId)
          .order('date', { ascending: false })
          .limit(limit);
        
        // Fetch new blog posts
        const { data: newPosts } = await supabaseExtended
          .from('blogs')
          .select('id, title, content, cover_image, created_at')
          .neq('id', currentPostId)
          .order('created_at', { ascending: false })
          .limit(limit);
        
        // Process and combine posts
        const formattedLegacyPosts = (legacyPosts || []).map((post) => ({
          id: post.id,
          title: language === 'en' ? post.title_en : post.title_es,
          excerpt: language === 'en' ? post.excerpt_en : post.excerpt_es,
          cover_image: post.cover_image,
          date: new Date(post.date).toLocaleDateString(),
          slug: post.slug,
          isLegacy: true
        }));
        
        const formattedNewPosts = (newPosts || []).map((post) => ({
          id: post.id,
          title: post.title,
          excerpt: '',
          cover_image: post.cover_image || '',
          date: new Date(post.created_at || '').toLocaleDateString(),
          slug: `${post.id}-${toKebabCase(post.title)}`,
          isLegacy: false
        }));
        
        // Combine and limit to requested number
        const combinedPosts = [...formattedNewPosts, ...formattedLegacyPosts].slice(0, limit);
        setPosts(combinedPosts);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentPostId) {
      fetchRecentPosts();
    }
  }, [currentPostId, limit, language]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                {post.cover_image ? (
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="h-16 w-16 object-cover rounded" 
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;


import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import BlogRenderer from '@/components/editor/BlogRenderer';

interface BlogDetailProps {
  slug: string;
}

const BlogDetail = ({ slug }: BlogDetailProps) => {
  const { t, language } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        // First check if there's a post with this slug in the old structure
        const { data: oldPostData, error: oldPostError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (oldPostData) {
          setPost({
            id: oldPostData.id,
            title: language === 'en' ? oldPostData.title_en : oldPostData.title_es,
            content: language === 'en' ? oldPostData.content_en : oldPostData.content_es,
            date: new Date(oldPostData.date).toLocaleDateString(),
            coverImage: oldPostData.cover_image,
            isLegacy: true
          });
          setLoading(false);
          return;
        }

        // Then check for a post in the new blogs table
        const { data: newPostData, error: newPostError } = await supabaseExtended
          .from('blogs')
          .select('*')
          .eq('id', slug) // Assuming slug is the ID for new blog structure
          .maybeSingle();

        if (newPostError && !oldPostError) throw newPostError;
        
        if (newPostData) {
          setPost({
            id: newPostData.id,
            title: newPostData.title,
            content: newPostData.content,
            date: new Date(newPostData.created_at).toLocaleDateString(),
            isLegacy: false
          });
        } else if (!oldPostData) {
          setError('Blog post not found');
        }
      } catch (err: any) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug, language]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <Skeleton className="h-96 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p>{error || 'Blog post not found'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-8">{post.date}</div>
      
      {post.coverImage && (
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-auto max-h-96 object-cover rounded-lg mb-8"
        />
      )}

      {post.isLegacy ? (
        // Render legacy content as HTML
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      ) : (
        // Render new content with EditorJS renderer
        <BlogRenderer content={post.content} />
      )}
    </div>
  );
};

export default BlogDetail;


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';
import { toKebabCase } from '@/utils/stringUtils';
import { useLanguage } from '@/contexts/LanguageContext';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        
        // Fetch blog posts from the blogs table
        const { data, error } = await supabaseExtended
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        
        // Get post IDs for tag fetching
        const postIds = data?.map(post => post.id) || [];
        
        // Fetch tags for all posts
        const { data: tagData, error: tagError } = await supabase
          .from('blog_tags')
          .select(`
            blog_id,
            tags:tag_id(
              id,
              name,
              color,
              category_id
            )
          `)
          .in('blog_id', postIds);
          
        if (tagError) {
          console.error('Error fetching tags:', tagError);
        }
        
        // Create a map of blog IDs to their tags
        const tagsByBlogId: Record<string, any[]> = {};
        
        tagData?.forEach(item => {
          if (!tagsByBlogId[item.blog_id]) {
            tagsByBlogId[item.blog_id] = [];
          }
          if (item.tags) {
            tagsByBlogId[item.blog_id].push(item.tags);
          }
        });
        
        // Process posts
        const formattedPosts = (data || []).map((post) => ({
          id: post.id,
          title: language === 'en' ? (post.title_en || post.title) : post.title,
          slug: post.slug || `${post.id}-${toKebabCase(post.title)}`,
          excerpt_en: '',
          excerpt_es: '',
          content_en: '',
          content_es: '',
          category_en: '',
          category_es: '',
          cover_image: post.cover_image || '',
          date: post.created_at,
          newContent: post.content,
          isLegacy: false,
          tags: tagsByBlogId[post.id] || []
        }));
        
        setPosts(formattedPosts as BlogPost[]);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          variant: "destructive",
          title: "Error loading blog posts",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [toast, language]);

  return { posts, loading };
}

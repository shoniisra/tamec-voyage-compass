
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';
import { toKebabCase } from '@/utils/stringUtils';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
        
        // Process posts
        const formattedPosts = (data || []).map((post) => ({
          id: post.id,
          title: post.title || '',
          title_en: post.title_en || post.title || '',
          title_es: post.title || '',
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
          isLegacy: false
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
  }, [toast]);

  return { posts, loading };
}

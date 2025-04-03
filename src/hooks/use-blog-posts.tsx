
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';
import { toKebabCase } from '@/utils/stringUtils';

interface BlogPostNew {
  id: string;
  title: string;
  content: any;
  cover_image?: string;
  created_at: string;
  slug?: string;
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        
        // Fetch legacy blog posts
        const { data: legacyData, error: legacyError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });

        if (legacyError) {
          throw legacyError;
        }
        
        // Fetch new blog posts
        const { data: newData, error: newError } = await supabaseExtended
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (newError) {
          console.error('Error fetching new blog posts:', newError);
          // Continue with legacy posts if available
        }

        // Process legacy posts
        const legacyPosts = legacyData.map((post: any) => ({
          ...post,
          title: post.title_en || post.title_es || '',
          isLegacy: true
        }));
        
        // Process new posts
        const newPosts = (newData || []).map((post: BlogPostNew) => ({
          id: post.id,
          title: post.title,
          title_en: post.title,
          title_es: post.title,
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
        
        // Combine and set both types of posts
        setPosts([...newPosts, ...legacyPosts] as BlogPost[]);
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

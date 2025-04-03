
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data as BlogPost[]);
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

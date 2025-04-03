
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';

export function useRecentPosts(currentPostId: string, limit: number = 3) {
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
          .neq('id', currentPostId)
          .order('date', { ascending: false })
          .limit(limit);

        if (error) {
          throw error;
        }

        setPosts(data as BlogPost[]);
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        toast({
          variant: "destructive",
          title: "Error loading recent posts",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }

    if (currentPostId) {
      fetchPosts();
    }
  }, [currentPostId, limit, toast]);

  return { posts, loading };
}

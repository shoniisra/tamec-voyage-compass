
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';
import { toKebabCase } from '@/utils/stringUtils';

export function useRecentPosts(currentPostId: string, limit: number = 3) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .neq('id', currentPostId)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (error) {
          throw error;
        }

        // Map the data to include the required fields
        const mappedPosts = (data || []).map(post => ({
          ...post,
          title: post.title_en || post.title || '',
          slug: post.slug || `${post.id}-${toKebabCase(post.title)}`,
          isLegacy: false
        }));

        setPosts(mappedPosts as BlogPost[]);
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

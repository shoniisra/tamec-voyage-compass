
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Comment } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_comments')
          .select('*')
          .eq('blog_id', postId)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setComments(data as Comment[]);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast({
          variant: "destructive",
          title: "Error loading comments",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }

    if (postId) {
      fetchComments();
    }
  }, [postId, toast]);

  const addComment = async (name: string, email: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .insert([
          { blog_id: postId, name, email, content }
        ])
        .select();

      if (error) {
        throw error;
      }

      setComments(prev => [data![0] as Comment, ...prev]);
      
      return { success: true };
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        variant: "destructive",
        title: "Error posting comment",
        description: "Please try again later.",
      });
      return { success: false };
    }
  };

  return { comments, loading, addComment };
}

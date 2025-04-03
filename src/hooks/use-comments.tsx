import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface Comment {
  id: string;
  blog_post_id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', postId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data as Comment[]);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (newComment: Omit<Comment, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .insert([{
          ...newComment,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
      setComments(prev => [data as Comment, ...prev]);
      return { success: true, data };
    } catch (error) {
      console.error('Error adding comment:', error);
      return { success: false, error };
    }
  };

  return {
    comments,
    loading,
    addComment,
    refreshComments: fetchComments,
  };
};
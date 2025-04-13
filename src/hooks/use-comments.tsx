
import { useState, useCallback } from 'react';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { Comment } from '@/types/blog';

export const useComments = (blogSlug: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!blogSlug) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // First, get the blog post by slug
      const { data: blog, error: blogError } = await supabaseExtended
        .from('blogs')
        .select('id')
        .eq('slug', blogSlug)
        .single();
      
      if (blogError) throw blogError;
      
      // Then, get comments for that blog
      const { data, error: commentsError } = await supabaseExtended
        .from('blog_comments')
        .select('*')
        .eq('blog_id', blog.id)
        .order('created_at', { ascending: false });
        
      if (commentsError) throw commentsError;
      
      setComments(data || []);
    } catch (err: any) {
      console.error('Error fetching comments:', err);
      setError(err.message || 'Failed to load comments');
    } finally {
      setLoading(false);
    }
  }, [blogSlug]);
  
  const submitComment = async (name: string, email: string, content: string) => {
    if (!blogSlug || !name || !email || !content) {
      setCommentError('All fields are required');
      return false;
    }
    
    setSubmitting(true);
    setCommentError(null);
    
    try {
      // First, get the blog post by slug
      const { data: blog, error: blogError } = await supabaseExtended
        .from('blogs')
        .select('id')
        .eq('slug', blogSlug)
        .single();
      
      if (blogError) throw blogError;
      
      // Then, submit the comment
      const { data, error: submitError } = await supabaseExtended
        .from('blog_comments')
        .insert([
          { blog_id: blog.id, name, email, content }
        ])
        .select()
        .single();
        
      if (submitError) throw submitError;
      
      // Update local comments state
      if (data) {
        setComments(prev => [data, ...prev]);
      }
      
      return true;
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      setCommentError(err.message || 'Failed to submit comment');
      return false;
    } finally {
      setSubmitting(false);
    }
  };
  
  return {
    comments,
    loading,
    error,
    submitting,
    commentError,
    fetchComments,
    submitComment
  };
};

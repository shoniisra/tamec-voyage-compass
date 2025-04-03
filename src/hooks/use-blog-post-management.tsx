
import { useState } from 'react';
import { BlogPost } from '@/types/blog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Interface for create/update blog post data
interface BlogPostFormData {
  title_en: string;
  title_es: string;
  slug: string;
  excerpt_en: string;
  excerpt_es: string;
  content_en: string;
  content_es: string;
  category_en: string;
  category_es: string;
  cover_image: string;
}

export function useBlogPostManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Create a new blog post
  const createBlogPost = async (data: BlogPostFormData) => {
    try {
      setIsLoading(true);
      
      // Check if slug already exists
      const { data: existingPost, error: checkError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', data.slug)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      if (existingPost) {
        throw new Error('A post with this slug already exists. Please choose a different slug.');
      }
      
      // Insert new post
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title_en: data.title_en,
          title_es: data.title_es,
          slug: data.slug,
          excerpt_en: data.excerpt_en,
          excerpt_es: data.excerpt_es,
          content_en: data.content_en,
          content_es: data.content_es,
          category_en: data.category_en,
          category_es: data.category_es,
          cover_image: data.cover_image,
          date: new Date().toISOString(),
        });
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      toast({
        variant: "destructive",
        title: "Error creating blog post",
        description: error.message || "An unexpected error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing blog post
  const updateBlogPost = async (id: string, data: BlogPostFormData) => {
    try {
      setIsLoading(true);
      
      // Check if slug already exists (for another post)
      const { data: existingPost, error: checkError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', data.slug)
        .neq('id', id)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      if (existingPost) {
        throw new Error('Another post with this slug already exists. Please choose a different slug.');
      }
      
      // Update post
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title_en: data.title_en,
          title_es: data.title_es,
          slug: data.slug,
          excerpt_en: data.excerpt_en,
          excerpt_es: data.excerpt_es,
          content_en: data.content_en,
          content_es: data.content_es,
          category_en: data.category_en,
          category_es: data.category_es,
          cover_image: data.cover_image,
        })
        .eq('id', id);
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error('Error updating blog post:', error);
      toast({
        variant: "destructive",
        title: "Error updating blog post",
        description: error.message || "An unexpected error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a blog post
  const deleteBlogPost = async (id: string) => {
    try {
      setIsLoading(true);
      
      // First, check if there are comments associated with this post
      const { data: comments, error: commentsError } = await supabase
        .from('blog_comments')
        .select('id')
        .eq('blog_post_id', id);
      
      if (commentsError) throw commentsError;
      
      // If there are comments, delete them first
      if (comments && comments.length > 0) {
        const { error: deleteCommentsError } = await supabase
          .from('blog_comments')
          .delete()
          .eq('blog_post_id', id);
        
        if (deleteCommentsError) throw deleteCommentsError;
      }
      
      // Then delete the post
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      toast({
        variant: "destructive",
        title: "Error deleting blog post",
        description: error.message || "An unexpected error occurred",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
  };
}

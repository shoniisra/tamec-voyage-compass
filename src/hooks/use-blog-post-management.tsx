
import { useState } from 'react';
import { BlogPost } from '@/types/blog';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { useToast } from '@/hooks/use-toast';

// Interface for EditorJS blog post
interface EditorJSBlogData {
  title: string;
  content: any;
  slug?: string;
  cover_image?: string;
  title_en?: string;
}

export function useBlogPostManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Create a new EditorJS blog post
  const createEditorJSBlogPost = async (data: EditorJSBlogData) => {
    try {
      setIsLoading(true);
      
      // Check if slug already exists
      if (data.slug) {
        const { data: existingPost, error: checkError } = await supabaseExtended
          .from('blogs')
          .select('id')
          .eq('slug', data.slug)
          .maybeSingle();
        
        if (checkError) throw checkError;
        
        if (existingPost) {
          throw new Error('A post with this slug already exists. Please choose a different slug.');
        }
      }
      
      // Insert new post
      const { error } = await supabaseExtended
        .from('blogs')
        .insert({
          title: data.title,
          title_en: data.title_en,
          content: data.content,
          cover_image: data.cover_image,
          slug: data.slug,
          created_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      
    } catch (error: any) {
      console.error('Error creating EditorJS blog post:', error);
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

  // Update an EditorJS blog post
  const updateEditorJSBlogPost = async (id: string, data: EditorJSBlogData) => {
    try {
      setIsLoading(true);
      
      // Check if slug already exists (for another post)
      if (data.slug) {
        const { data: existingPost, error: checkError } = await supabaseExtended
          .from('blogs')
          .select('id')
          .eq('slug', data.slug)
          .neq('id', id)
          .maybeSingle();
        
        if (checkError) throw checkError;
        
        if (existingPost) {
          throw new Error('Another post with this slug already exists. Please choose a different slug.');
        }
      }
      
      // Update post
      const { error } = await supabaseExtended
        .from('blogs')
        .update({
          title: data.title,
          title_en: data.title_en,
          content: data.content,
          cover_image: data.cover_image,
          slug: data.slug,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      
    } catch (error: any) {
      console.error('Error updating EditorJS blog post:', error);
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
      
      // Delete from blogs table
      let { error: blogsError } = await supabaseExtended
        .from('blogs')
        .delete()
        .eq('id', id);
      
      if (blogsError) throw blogsError;
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      
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
    createEditorJSBlogPost,
    updateEditorJSBlogPost,
    deleteBlogPost,
  };
}

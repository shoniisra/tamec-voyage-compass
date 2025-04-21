import { useState } from "react";
import { BlogPost, EditorJSBlogData } from "@/modules/blog/types/blog";
import { supabaseExtended } from "@/integrations/supabase/client-extended";
import { useToast } from "@/hooks/use-toast";

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
          .from("blogs")
          .select("id")
          .eq("slug", data.slug)
          .maybeSingle();

        if (checkError) throw checkError;

        if (existingPost) {
          throw new Error(
            "Un post con este slug ya existe. Por favor, elige un slug diferente."
          );
        }
      }

      // Insert new post
      const { data: newPost, error } = await supabaseExtended
        .from("blogs")
        .insert({
          title: data.title,
          title_en: data.title_en,
          content: data.content,
          content_en: data.content_en,
          cover_image: data.cover_image,
          slug: data.slug,
          created_at: new Date().toISOString(),
        })
        .select("*")
        .single();

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Post del blog creado exitosamente",
      });

      return newPost;
    } catch (error: any) {
      console.error("Error creating EditorJS blog post:", error);
      toast({
        variant: "destructive",
        title: "Error al crear el post",
        description: error.message || "Ocurrió un error inesperado",
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
          .from("blogs")
          .select("id")
          .eq("slug", data.slug)
          .neq("id", id)
          .maybeSingle();

        if (checkError) throw checkError;

        if (existingPost) {
          throw new Error(
            "Otro post con este slug ya existe. Por favor, elige un slug diferente."
          );
        }
      }

      // Update post
      const { error } = await supabaseExtended
        .from("blogs")
        .update({
          title: data.title,
          title_en: data.title_en,
          content: data.content,
          content_en: data.content_en,
          cover_image: data.cover_image,
          slug: data.slug,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Post del blog actualizado exitosamente",
      });
    } catch (error: any) {
      console.error("Error updating EditorJS blog post:", error);
      toast({
        variant: "destructive",
        title: "Error al actualizar el post",
        description: error.message || "Ocurrió un error inesperado",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a blog post
  const deleteBlogPost = async (id: string, onSuccess?: () => void) => {
    try {
      setIsLoading(true);

      // Delete from blogs table
      let { error: blogsError } = await supabaseExtended
        .from("blogs")
        .delete()
        .eq("id", id);

      if (blogsError) throw blogsError;

      toast({
        title: "Éxito",
        description: "Post del blog eliminado exitosamente",
      });

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error deleting blog post:", error);
      toast({
        variant: "destructive",
        title: "Error al eliminar el post",
        description: error.message || "Ocurrió un error inesperado",
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

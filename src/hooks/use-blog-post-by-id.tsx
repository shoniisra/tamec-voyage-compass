import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/modules/blog/types/blog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function useBlogPostById(id: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!data) {
          toast({
            variant: "destructive",
            title: "Post not found",
            description: "The requested blog post could not be found.",
          });
          navigate("/admin/blog/posts");
          return;
        }

        // Convert to BlogPost type with title field
        const blogPost: BlogPost = {
          ...data,
          title: data.title_en || data.title || "",
          isLegacy: false,
        };

        setPost(blogPost);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          variant: "destructive",
          title: "Error loading blog post",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, toast, navigate]);

  return { post, loading };
}

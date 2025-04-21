import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Comment } from "@/modules/blog/types/blog";
import { useToast } from "@/components/ui/use-toast";

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState<string | null>(null);
  const [addingComment, setAddingComment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("blog_comments")
          .select("*")
          .eq("blog_id", postId)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        // Map the database fields to our Comment type
        const mappedComments = data.map((comment: any) => ({
          id: comment.id,
          blog_id: comment.blog_id,
          name: comment.name,
          email: comment.email,
          content: comment.content,
          created_at: comment.created_at,
        }));

        setComments(mappedComments as Comment[]);
      } catch (error) {
        console.error("Error fetching comments:", error);
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
      setBlogId(postId);
    }
  }, [postId, toast]);

  const addComment = async (name: string, email: string, content: string) => {
    if (!blogId) return;

    setAddingComment(true);
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .insert({
          name,
          email,
          content,
          blog_id: blogId
        })
        .select();

      if (error) throw error;

      // Update state with the new comment
      setComments(prev => [...prev, data[0] as Comment]);
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        variant: "destructive",
        title: "Error posting comment",
        description: "Please try again later.",
      });
    } finally {
      setAddingComment(false);
    }
  };

  return { comments, loading, addComment };
}

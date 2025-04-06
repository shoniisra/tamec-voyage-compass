
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export function useBlogTags() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Get tags for a specific blog post
  const getBlogTags = async (blogId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blog_tags')
        .select(`
          tag_id,
          tags(id, name, color, category_id)
        `)
        .eq('blog_id', blogId);
      
      if (error) throw error;
      
      // Extract the tag objects from the results
      return data.map(item => item.tags);
    } catch (error) {
      console.error('Error fetching blog tags:', error);
      toast({
        variant: "destructive",
        title: "Error loading tags",
        description: "Could not load tags for this blog post.",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Update tags for a specific blog post
  const updateBlogTags = async (blogId: string, tagIds: string[]) => {
    try {
      setLoading(true);
      
      // First, remove all existing tag relationships for this blog
      const { error: deleteError } = await supabase
        .from('blog_tags')
        .delete()
        .eq('blog_id', blogId);
      
      if (deleteError) throw deleteError;
      
      // If there are no tags selected, we're done
      if (tagIds.length === 0) return true;
      
      // Create new tag relationships
      const tagRelationships = tagIds.map(tagId => ({
        blog_id: blogId,
        tag_id: tagId
      }));
      
      const { error: insertError } = await supabase
        .from('blog_tags')
        .insert(tagRelationships);
      
      if (insertError) throw insertError;
      
      return true;
    } catch (error) {
      console.error('Error updating blog tags:', error);
      toast({
        variant: "destructive",
        title: "Error saving tags",
        description: "Could not update tags for this blog post.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { getBlogTags, updateBlogTags, loading };
}

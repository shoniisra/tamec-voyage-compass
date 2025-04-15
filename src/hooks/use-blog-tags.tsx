
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Utility function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Constants for retry mechanism
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRY_DELAY = 5000; // 5 seconds

export function useBlogTags() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Get tags for a specific blog post with retry mechanism
  const getBlogTags = useCallback(async (blogId: string) => {
    let retryCount = 0;
    let lastError: any = null;

    while (retryCount < MAX_RETRIES) {
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
      } catch (error: any) {
        lastError = error;
        
        // Check if error is related to insufficient resources
        if (error.message?.includes('ERR_INSUFFICIENT_RESOURCES') || 
            error.message?.includes('Failed to fetch')) {
          retryCount++;
          
          if (retryCount < MAX_RETRIES) {
            // Calculate delay with exponential backoff
            const backoffDelay = Math.min(
              INITIAL_RETRY_DELAY * Math.pow(2, retryCount - 1),
              MAX_RETRY_DELAY
            );
            
            console.log(`Retrying fetch (${retryCount}/${MAX_RETRIES}) after ${backoffDelay}ms`);
            await delay(backoffDelay);
            continue;
          }
        }
        
        // If error is not retryable or max retries reached
        console.error('Error fetching blog tags:', error);
        toast({
          variant: "destructive",
          title: "Error loading tags",
          description: retryCount > 0
            ? `Failed to load tags after ${retryCount} retries.`
            : "Could not load tags for this blog post.",
        });
        return [];
      } finally {
        if (retryCount === MAX_RETRIES - 1 || !lastError) {
          setLoading(false);
        }
      }
    }
    
    return [];
  }, [toast]);

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

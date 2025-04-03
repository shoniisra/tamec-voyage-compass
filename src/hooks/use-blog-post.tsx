
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';
import { toKebabCase } from '@/utils/stringUtils';

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        
        // Check if the slug starts with a UUID pattern (new format: id-kebab-title)
        const idMatch = slug.match(/^([0-9a-fA-F-]+)/);
        
        if (idMatch) {
          // This is likely a new format post with ID-kebab-title
          const postId = idMatch[1];
          
          // Try to fetch from the blogs table
          const { data: newPost, error: newPostError } = await supabaseExtended
            .from('blogs')
            .select('*')
            .eq('id', postId)
            .maybeSingle();
          
          if (newPost) {
            // Found in the blogs table
            setPost({
              id: newPost.id,
              title: newPost.title,
              title_en: newPost.title_en || newPost.title,
              content_en: '',
              cover_image: newPost.cover_image || '',
              date: newPost.created_at || '',
              slug: newPost.slug || `${newPost.id}-${toKebabCase(newPost.title)}`,
              isLegacy: false,
              newContent: newPost.content
            });
            setLoading(false);
            return;
          }
        }
        
        // Try to find the post with exact slug in the blogs table
        const { data: postBySlug } = await supabaseExtended
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
          
        if (postBySlug) {
          setPost({
            id: postBySlug.id,
            title: postBySlug.title,
            title_en: postBySlug.title_en || postBySlug.title,
            cover_image: postBySlug.cover_image || '',
            date: postBySlug.created_at || '',
            slug: postBySlug.slug || `${postBySlug.id}-${toKebabCase(postBySlug.title)}`,
            isLegacy: false,
            newContent: postBySlug.content
          });
        } else {
          // Post not found in either table
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast({
          variant: "destructive",
          title: "Error loading blog post",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug, toast]);

  return { post, loading };
}

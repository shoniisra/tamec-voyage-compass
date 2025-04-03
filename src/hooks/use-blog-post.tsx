
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';

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
          
          // Try to fetch from the new blogs table first
          const { data: newPost, error: newPostError } = await supabaseExtended
            .from('blogs')
            .select('*')
            .eq('id', postId)
            .maybeSingle();
          
          if (newPost) {
            // Found in the new table
            setPost({
              id: newPost.id,
              title_en: newPost.title,
              title_es: newPost.title,
              excerpt_en: '',
              excerpt_es: '',
              content_en: '',
              content_es: '',
              cover_image: newPost.cover_image || '',
              date: newPost.created_at,
              category_en: '',
              category_es: '',
              slug: slug,
              isLegacy: false,
              newContent: newPost.content
            });
            setLoading(false);
            return;
          }
          
          // If not found in new table, try legacy with the ID
          const { data: legacyById } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', postId)
            .maybeSingle();
          
          if (legacyById) {
            setPost({...legacyById, isLegacy: true} as BlogPost);
            setLoading(false);
            return;
          }
        }
        
        // Try the legacy approach with full slug match
        const { data: legacyBySlug } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (legacyBySlug) {
          setPost({...legacyBySlug, isLegacy: true} as BlogPost);
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

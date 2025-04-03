
import { useState, useEffect } from 'react';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        
        // Try to find the post with the provided slug in the blogs table
        const { data: postBySlug, error: slugError } = await supabaseExtended
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
          
        if (postBySlug) {
          // Found the post by slug
          setPost({
            id: postBySlug.id,
            title: language === 'en' ? (postBySlug.title_en || postBySlug.title) : postBySlug.title,
            cover_image: postBySlug.cover_image || '',
            date: postBySlug.created_at || '',
            slug: postBySlug.slug || '',
            isLegacy: false,
            newContent: postBySlug.content
          });
          return;
        }
        
        // If not found by slug, check if the slug is actually an ID
        const { data: postById, error: idError } = await supabaseExtended
          .from('blogs')
          .select('*')
          .eq('id', slug)
          .maybeSingle();
          
        if (postById) {
          // Found by ID
          setPost({
            id: postById.id,
            title: language === 'en' ? (postById.title_en || postById.title) : postById.title,
            cover_image: postById.cover_image || '',
            date: postById.created_at || '',
            slug: postById.slug || '',
            isLegacy: false,
            newContent: postById.content
          });
          return;
        }
        
        // Post not found
        setPost(null);
        
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
  }, [slug, toast, language]);

  return { post, loading };
}

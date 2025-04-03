
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
          
          // If not found in new table, try legacy with the ID
          const { data: legacyById } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', postId)
            .maybeSingle();
          
          if (legacyById) {
            setPost({
              ...legacyById,
              title: legacyById.title_en || legacyById.title_es || '',
              isLegacy: true
            });
            setLoading(false);
            return;
          }
        }
        
        // Try to find the post with exact slug in the new blogs table
        const { data: newPostBySlug } = await supabaseExtended
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
          
        if (newPostBySlug) {
          setPost({
            id: newPostBySlug.id,
            title: newPostBySlug.title,
            title_en: newPostBySlug.title_en || newPostBySlug.title,
            cover_image: newPostBySlug.cover_image || '',
            date: newPostBySlug.created_at || '',
            slug: newPostBySlug.slug || `${newPostBySlug.id}-${toKebabCase(newPostBySlug.title)}`,
            isLegacy: false,
            newContent: newPostBySlug.content
          });
          setLoading(false);
          return;
        }
        
        // Try the legacy approach with full slug match
        const { data: legacyBySlug } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (legacyBySlug) {
          setPost({
            ...legacyBySlug,
            title: legacyBySlug.title_en || legacyBySlug.title_es || '',
            isLegacy: true
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

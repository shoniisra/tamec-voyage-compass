
import { useState, useEffect } from 'react';
import { supabaseExtended } from '@/integrations/supabase/client-extended';
import { BlogPost, Tags } from '@/types/blog';

export const useBlogPostById = (id: string | undefined) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    const fetchBlogPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: blogData, error: blogError } = await supabaseExtended
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();

        if (blogError) throw blogError;

        // Fetch tags for the blog
        const { data: tagRelations, error: tagRelationsError } = await supabaseExtended
          .from('blog_tags')
          .select('tag_id')
          .eq('blog_id', id);

        if (tagRelationsError) throw tagRelationsError;

        let tags: Tags[] = [];
        
        if (tagRelations && tagRelations.length > 0) {
          const tagIds = tagRelations.map(relation => relation.tag_id);
          
          const { data: tagData, error: tagError } = await supabaseExtended
            .from('tags')
            .select('*')
            .in('id', tagIds);

          if (tagError) throw tagError;
          
          tags = tagData || [];
        }

        if (blogData) {
          // Convert to BlogPost format
          const formattedBlog: BlogPost = {
            id: blogData.id,
            slug: blogData.slug,
            title: blogData.title,
            title_en: blogData.title_en,
            content: blogData.content,
            content_en: blogData.content_en,
            cover_image: blogData.cover_image,
            created_at: blogData.created_at,
            updated_at: blogData.updated_at,
            date: blogData.created_at || new Date().toISOString(), // Ensure date property is set
            tags: tags
          };

          setBlog(formattedBlog);
        }
      } catch (err: any) {
        console.error('Error fetching blog post:', err);
        setError(err.message || 'An error occurred while fetching the blog post.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  return { blog, loading, error };
};

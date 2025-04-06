
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export type Tag = {
  id: string;
  name: string;
  color: string;
  category_id: string | null;
  category_name?: string;
};

export type TagCategory = {
  id: string;
  name: string;
  description: string | null;
  sort_order: number | null;
};

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<TagCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch tag categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('tag_categories')
          .select('*')
          .order('sort_order', { ascending: true });
        
        if (categoriesError) throw categoriesError;
        
        // Fetch tags with category names
        const { data: tagsData, error: tagsError } = await supabase
          .from('tags')
          .select(`
            *,
            tag_categories(name)
          `)
          .order('name');
        
        if (tagsError) throw tagsError;
        
        // Process tags data to include category name
        const processedTags = tagsData.map(tag => ({
          id: tag.id,
          name: tag.name,
          color: tag.color,
          category_id: tag.category_id,
          category_name: tag.tag_categories ? tag.tag_categories.name : null
        }));
        
        setCategories(categoriesData as TagCategory[]);
        setTags(processedTags as Tag[]);
      } catch (error) {
        console.error('Error fetching tags:', error);
        toast({
          variant: "destructive",
          title: "Error loading tags",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [toast]);

  return { tags, categories, loading };
}

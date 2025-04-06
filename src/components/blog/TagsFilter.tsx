
import React from 'react';
import { useTags, TagCategory, Tag } from '@/hooks/use-tags';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';

interface TagsFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({ selectedTags, onTagsChange }) => {
  const { tags, categories, loading } = useTags();
  const { language } = useLanguage();

  const handleTagToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  // Group tags by category
  const tagsByCategory: Record<string, Tag[]> = {};
  
  // Add uncategorized group
  tagsByCategory['uncategorized'] = [];
  
  // Add categories from database
  categories.forEach(category => {
    tagsByCategory[category.id] = [];
  });
  
  // Sort tags into categories
  tags.forEach(tag => {
    if (tag.category_id && tagsByCategory[tag.category_id]) {
      tagsByCategory[tag.category_id].push(tag);
    } else {
      tagsByCategory['uncategorized'].push(tag);
    }
  });

  if (loading) {
    return <div className="animate-pulse h-40 bg-gray-100 dark:bg-gray-800 rounded-md"></div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-2">
        {language === 'en' ? 'Filter by Tags' : 'Filtrar por Etiquetas'}
      </h3>
      
      <div className="space-y-6">
        {/* Render tags by category */}
        {categories.map(category => {
          const categoryTags = tagsByCategory[category.id];
          if (!categoryTags || categoryTags.length === 0) return null;
          
          return (
            <div key={category.id} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {category.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {categoryTags.map(tag => (
                  <Badge 
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    style={{ 
                      borderColor: tag.color,
                      ...(selectedTags.includes(tag.id) 
                        ? { backgroundColor: tag.color, color: getContrastColor(tag.color) }
                        : { color: tag.color }) 
                    }}
                    onClick={() => handleTagToggle(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Render uncategorized tags */}
        {tagsByCategory['uncategorized'].length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Other Tags' : 'Otras Etiquetas'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {tagsByCategory['uncategorized'].map(tag => (
                <Badge 
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  style={{ 
                    borderColor: tag.color,
                    ...(selectedTags.includes(tag.id) 
                      ? { backgroundColor: tag.color, color: getContrastColor(tag.color) }
                      : { color: tag.color }) 
                  }}
                  onClick={() => handleTagToggle(tag.id)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to determine contrasting text color (black or white)
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black or white depending on luminance
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export default TagsFilter;

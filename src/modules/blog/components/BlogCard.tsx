import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  category?: string;
  coverImage?: string;
  tags?: any[];
  slug: string;
}

const BlogCard = ({ id, title, excerpt, date, category, coverImage, tags, slug }: BlogCardProps) => {
  // Get 5 minutes read time for every 500 characters in excerpt
  const readTime = excerpt ? Math.max(1, Math.ceil(excerpt.length / 500) * 5) : 5;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 transition-transform hover:shadow-lg hover:-translate-y-1">
      <Link to={`/blog/${slug}`} className="block">
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag.id}
                variant="outline"
                style={{ 
                  borderColor: tag.color,
                  color: tag.color 
                }}
                className="text-xs font-medium"
              >
                {tag.name}
              </Badge>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        
        {excerpt && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 flex-wrap gap-y-2">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readTime} min read</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

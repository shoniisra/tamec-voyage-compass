
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
  slug: string;
}

const BlogCard = ({ id, title, excerpt, coverImage, date, category, slug }: BlogCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden h-full transition-transform hover:-translate-y-1 duration-300">
      <Link to={`/blog/${slug}`} className="block h-48 overflow-hidden">
        <img 
          src={coverImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </Link>
      
      <CardContent className="p-6">
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <span className="bg-tamec-50 text-tamec-700 px-2 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center ml-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        
        <Link to={`/blog/${slug}`} className="block">
          <h3 className="text-xl font-bold mb-2 hover:text-tamec-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 line-clamp-3 mb-3">
          {excerpt}
        </p>
        
        <Link 
          to={`/blog/${slug}`}
          className="inline-flex text-tamec-600 hover:text-tamec-700 font-medium"
        >
          {t('blog.readMore')}
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

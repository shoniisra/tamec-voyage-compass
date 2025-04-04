import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
  const { t, language } = useLanguage();
  
  const defaultImage = "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80";
  
  return (
    <Card className="overflow-hidden h-full rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border dark:border-gray-700">
      <Link to={`/blog/${slug}`} className="block h-52 overflow-hidden relative">
        <img 
          src={coverImage || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        {category && (
          <span className="absolute top-4 left-4 bg-tamec-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {category}
          </span>
        )}
      </Link>
      
      <CardContent className="p-6">
        <div className="flex items-center text-muted-foreground mb-3 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        
        <Link to={`/blog/${slug}`} className="block group">
          <h3 className="text-xl font-bold mb-3 group-hover:text-tamec-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {excerpt || (language === 'en' ? 'Discover more about this travel experience...' : 'Descubre más sobre esta experiencia de viaje...')}
        </p>
        
        <Link to={`/blog/${slug}`} className="inline-flex items-center text-tamec-600 hover:text-tamec-700 font-medium group">
          {t('blog.readMore')}
          <ArrowRight className="h-4 w-4 ml-1 transition-transform transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

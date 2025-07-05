
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import ModernCard from './ModernCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  price?: string;
  rating?: number;
  popular?: boolean;
  features?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  href,
  price,
  rating,
  popular,
  features = []
}) => {
  return (
    <ModernCard className="overflow-hidden p-0 group h-full flex flex-col">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-32 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {popular && (
          <Badge className="absolute top-2 md:top-3 left-2 md:left-3 bg-yellow-500 text-black text-xs">
            Popular
          </Badge>
        )}
        {rating && (
          <div className="absolute top-2 md:top-3 right-2 md:right-3 flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-lg text-xs">
            <Star className="h-3 w-3 fill-current" />
            <span>{rating}</span>
          </div>
        )}
      </div>

      <div className="p-3 md:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <h3 className="text-sm md:text-lg font-semibold text-foreground group-hover:text-tamec-600 transition-colors flex-1 pr-2">
            {title}
          </h3>
          {price && (
            <div className="text-right flex-shrink-0">
              <div className="text-xs text-muted-foreground hidden md:block">desde</div>
              <div className="text-sm md:text-xl font-bold text-tamec-600">{price}</div>
            </div>
          )}
        </div>

        <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 flex-1">
          {description}
        </p>

        {features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
            {features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}

        <Button asChild className="w-full group/btn text-xs md:text-sm h-8 md:h-10">
          <Link to={href}>
            Ver más
            <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </ModernCard>
  );
};

export default ServiceCard;

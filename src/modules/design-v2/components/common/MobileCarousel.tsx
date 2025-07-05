
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface MobileServiceCard {
  title: string;
  price: string;
  rating: number;
  image: string;
  href: string;
  popular?: boolean;
}

interface MobileCarouselProps {
  services: MobileServiceCard[];
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ services }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 1,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {services.map((service, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2">
            <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-32 object-cover"
                />
                {service.popular && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500 text-black text-xs">
                    Popular
                  </Badge>
                )}
                <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{service.rating}</span>
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2 flex-1 pr-2">
                    {service.title}
                  </h3>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-muted-foreground">desde</div>
                    <div className="text-sm font-bold text-tamec-600">{service.price}</div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full text-xs h-7">
                  <Link to={service.href}>
                    Ver más
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MobileCarousel;

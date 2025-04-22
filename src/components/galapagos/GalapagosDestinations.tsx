
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

const GalapagosDestinations = () => {
  const { language } = useLanguage();

  const destinations = [
    {
      name: language === 'en' ? 'Santa Cruz Island' : 'Isla Santa Cruz',
      image: 'https://images.unsplash.com/photo-1588409474348-4d3761d3a095?auto=format&fit=crop&w=800&q=80',
      description: language === 'en' 
        ? 'The most populated island and home to the Charles Darwin Research Station.' 
        : 'La isla más poblada y hogar de la Estación Científica Charles Darwin.'
    },
    {
      name: language === 'en' ? 'San Cristóbal Island' : 'Isla San Cristóbal',
      image: 'https://images.unsplash.com/photo-1552201474-c9ce225bd22d?auto=format&fit=crop&w=800&q=80',
      description: language === 'en'
        ? 'Known for its incredible snorkeling sites and sea lion colonies.' 
        : 'Conocida por sus increíbles sitios de buceo y colonias de lobos marinos.'
    },
    {
      name: language === 'en' ? 'Isabela Island' : 'Isla Isabela',
      image: 'https://images.unsplash.com/photo-1604607664972-5bb0866696d4?auto=format&fit=crop&w=800&q=80',
      description: language === 'en'
        ? 'The largest island with six volcanoes and unique wildlife.' 
        : 'La isla más grande con seis volcanes y vida silvestre única.'
    },
    {
      name: language === 'en' ? 'Floreana Island' : 'Isla Floreana',
      image: 'https://images.unsplash.com/photo-1541395622652-613a89e66558?auto=format&fit=crop&w=800&q=80',
      description: language === 'en'
        ? 'Home to pink flamingos and the historic Post Office Bay.' 
        : 'Hogar de flamencos rosados y la histórica Bahía Post Office.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          {language === 'en' ? 'Destinations in Galápagos' : 'Destinos en Galápagos'}
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          {language === 'en'
            ? 'Explore these incredible islands with our specially designed tours.'
            : 'Explora estas increíbles islas con nuestros tours especialmente diseñados.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Card key={index} className="overflow-hidden h-[400px] group">
              <div className="relative h-full">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                  <p className="text-white/80 text-sm">{destination.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalapagosDestinations;

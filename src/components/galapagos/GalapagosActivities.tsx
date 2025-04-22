
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Ship, Compass, Beach, Camera } from 'lucide-react';

const GalapagosActivities = () => {
  const { language } = useLanguage();

  const activities = [
    {
      icon: <Ship className="h-10 w-10 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Snorkel with Sea Lions' : 'Buceo con Lobos Marinos',
      description: language === 'en' 
        ? 'Dive into crystal clear waters and swim alongside playful sea lions, rays, and impressive hammerhead sharks.' 
        : 'Sumérgete en aguas cristalinas y nada junto a juguetones lobos marinos, mantarrayas y los imponentes tiburones martillo.'
    },
    {
      icon: <Compass className="h-10 w-10 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Walk with Giant Tortoises' : 'Camina junto a Tortugas Gigantes',
      description: language === 'en'
        ? 'Experience the thrill of walking alongside giant tortoises in their natural habitat.' 
        : 'Experimenta la emoción de caminar junto a tortugas gigantes en su hábitat natural.'
    },
    {
      icon: <Beach className="h-10 w-10 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Island Hopping' : 'Recorrido por Islas',
      description: language === 'en'
        ? 'Visit multiple islands and discover dream beaches with pristine white sand and turquoise waters.' 
        : 'Visita múltiples islas y descubre playas de ensueño con arena blanca prístina y aguas turquesa.'
    },
    {
      icon: <Camera className="h-10 w-10 text-tamec-600 mb-4" />,
      title: language === 'en' ? 'Wildlife Photography' : 'Fotografía de Fauna',
      description: language === 'en'
        ? 'Capture unique moments with fauna you won\'t see anywhere else on the planet.' 
        : 'Captura momentos únicos con fauna que no verás en ningún otro lugar del planeta.'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' 
            ? 'Adventure, Nature and Magic in Every Corner' 
            : 'Aventura, naturaleza y magia en cada rincón'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow flex flex-col items-center">
              <div className="mb-2">{activity.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{activity.title}</h3>
              <p className="text-muted-foreground">{activity.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalapagosActivities;

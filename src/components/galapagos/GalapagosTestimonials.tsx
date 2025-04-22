
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const GalapagosTestimonials = () => {
  const { language } = useLanguage();

  const testimonials = [
    {
      name: language === 'en' ? 'Valeria M.' : 'Valeria M.',
      quote: language === 'en' 
        ? 'Snorkeling with hammerhead sharks was the craziest thing I\'ve ever done. A thousand thanks to TAMEC for organizing everything perfectly.' 
        : 'Bucear con tiburones martillo fue lo más loco que he hecho. Mil gracias TAMEC por organizar todo perfecto.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80',
      location: language === 'en' ? 'Santa Cruz Island' : 'Isla Santa Cruz'
    },
    {
      name: language === 'en' ? 'Ricardo P.' : 'Ricardo P.',
      quote: language === 'en'
        ? 'The cruise experience exceeded all our expectations. The guides were knowledgeable and the food was amazing.' 
        : 'La experiencia en el crucero superó todas nuestras expectativas. Los guías eran muy conocedores y la comida fue increíble.',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150&q=80',
      location: language === 'en' ? 'Galapagos Cruise' : 'Crucero por Galápagos'
    },
    {
      name: language === 'en' ? 'Sofia L.' : 'Sofía L.',
      quote: language === 'en'
        ? 'Swimming with sea lions and seeing the giant tortoises up close was a dream come true. Everything was perfect!' 
        : 'Nadar con lobos marinos y ver las tortugas gigantes de cerca fue un sueño hecho realidad. ¡Todo fue perfecto!',
      image: 'https://images.unsplash.com/photo-1525735765456-7f67273a9d93?auto=format&fit=crop&w=150&h=150&q=80',
      location: language === 'en' ? 'Isabela Island' : 'Isla Isabela'
    }
  ];

  return (
    <section className="py-16 bg-tamec-50 dark:bg-tamec-900/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'What Our Travelers Say' : 'Lo Que Dicen Nuestros Viajeros'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="rounded-full w-12 h-12 object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalapagosTestimonials;

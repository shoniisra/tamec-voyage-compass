
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Star, StarIcon, Quote } from 'lucide-react';

const Testimonials = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      id: 1,
      name: language === 'en' ? 'Andrea M.' : 'Andrea M.',
      content: language === 'en' 
        ? 'With TAMEC, traveling was easier than I imagined. They helped me with everything, including getting my visa.'
        : 'Con TAMEC viajar fue más fácil de lo que imaginé. Me ayudaron con todo, incluso con la visa.',
      rating: 5
    },
    {
      id: 2,
      name: language === 'en' ? 'Diego R.' : 'Diego R.',
      content: language === 'en' 
        ? 'Complete transparency from day one. Thank you for making my dream of visiting Europe a reality!'
        : 'Transparencia total desde el día uno. ¡Gracias por hacer realidad mi sueño de conocer Europa!',
      rating: 5
    },
    {
      id: 3,
      name: language === 'en' ? 'Carlos N.' : 'Carlos N.',
      content: language === 'en' 
        ? 'Exceptional service, they arranged everything perfectly. I will definitely travel with TAMEC again!'
        : 'Servicio excepcional, organizaron todo perfectamente. ¡Definitivamente volveré a viajar con TAMEC!',
      rating: 5
    }
  ];
  
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h3 className="text-sm font-bold text-center text-yellow-400 uppercase mb-2">
          {language === 'en' ? 'Real Testimonials' : 'Testimonios reales'}
        </h3>
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'What Our Travelers Say' : 'Lo que dicen nuestros viajeros'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-tamec-600 mb-3 opacity-20" />
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">{testimonial.content}</p>
                <div className="mt-4 font-semibold">{testimonial.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

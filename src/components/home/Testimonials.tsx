
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { language } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: 'Andrea M.',
      text: language === 'en' 
        ? 'With TAMEC, traveling was easier than I imagined. They helped me with everything, even with the visa.'
        : 'Con TAMEC viajar fue más fácil de lo que imaginé. Me ayudaron con todo, incluso con la visa.',
      image: 'https://i.pravatar.cc/150?img=5',
      initials: 'AM',
    },
    {
      id: 2,
      name: 'Diego R.',
      text: language === 'en'
        ? 'Total transparency from day one. Thank you for making my dream of getting to know Europe come true!'
        : 'Transparencia total desde el día uno. ¡Gracias por hacer realidad mi sueño de conocer Europa!',
      image: 'https://i.pravatar.cc/150?img=3',
      initials: 'DR',
    },
    {
      id: 3,
      name: 'Lucia P.',
      text: language === 'en'
        ? 'I traveled with my family and everything was perfect. The hotels, the tours, everything. We will definitely travel with TAMEC again.'
        : 'Viajé con mi familia y todo fue perfecto. Los hoteles, los tours, todo. Definitivamente volveremos a viajar con TAMEC.',
      image: 'https://i.pravatar.cc/150?img=1',
      initials: 'LP',
    },
  ];

  return (
    <section className="py-16 bg-tamec-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            {language === 'en' ? 'Real Testimonials' : 'Testimonios reales'}
          </h2>
          <p className="text-tamec-100 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Hear from our satisfied customers who\'ve experienced unforgettable journeys with TAMEC Travel.'
              : 'Escucha a nuestros clientes satisfechos que han experimentado viajes inolvidables con TAMEC Travel.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-lg overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-tamec-200 text-tamec-700">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className="h-5 w-5 text-yellow-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-600 italic">
                    "{testimonial.text}"
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

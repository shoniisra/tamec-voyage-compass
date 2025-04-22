
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      id: 1,
      name: language === 'en' ? 'Maria Rodriguez' : 'María Rodríguez',
      visa: language === 'en' ? 'U.S. Tourist Visa' : 'Visa de Turista para EE.UU.',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5,
      text: language === 'en'
        ? "After being denied a U.S. visa twice on my own, I contacted TAMEC Travel Agency. Their expert guidance made all the difference. They identified the weak points in my previous applications and helped me prepare a much stronger case. I finally got my 10-year visa approved! Can't recommend them enough."
        : "Después de que me negaran la visa estadounidense dos veces por mi cuenta, contacté a TAMEC Travel Agency. Su guía experta marcó la diferencia. Identificaron los puntos débiles en mis solicitudes anteriores y me ayudaron a preparar un caso mucho más sólido. ¡Finalmente me aprobaron mi visa de 10 años! No puedo recomendarlos lo suficiente."
    },
    {
      id: 2,
      name: language === 'en' ? 'Carlos Mendoza' : 'Carlos Mendoza',
      visa: language === 'en' ? 'Schengen Visa' : 'Visa Schengen',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 5,
      text: language === 'en'
        ? "The Schengen visa process seemed incredibly complicated until I found TAMEC. They simplified everything, told me exactly what documents I needed and even helped with translations. The process was smooth and stress-free. I got my visa in just 10 days!"
        : "El proceso de visa Schengen parecía increíblemente complicado hasta que encontré TAMEC. Simplificaron todo, me dijeron exactamente qué documentos necesitaba e incluso ayudaron con traducciones. El proceso fue sencillo y sin estrés. ¡Obtuve mi visa en solo 10 días!"
    },
    {
      id: 3,
      name: language === 'en' ? 'Alejandra Torres' : 'Alejandra Torres',
      visa: language === 'en' ? 'Student Visa for Canada' : 'Visa de Estudiante para Canadá',
      image: 'https://randomuser.me/api/portraits/women/67.jpg',
      rating: 5,
      text: language === 'en'
        ? "As a student, I was worried about the complex Canadian study permit process. TAMEC's team guided me through every step, from document preparation to the biometrics appointment. Their interview preparation was particularly helpful. Thanks to their support, I'll be starting my Master's program in Toronto next month!"
        : "Como estudiante, estaba preocupada por el complejo proceso de permiso de estudio canadiense. El equipo de TAMEC me guió en cada paso, desde la preparación de documentos hasta la cita de biometría. Su preparación para la entrevista fue particularmente útil. ¡Gracias a su apoyo, comenzaré mi programa de Maestría en Toronto el próximo mes!"
    },
    {
      id: 4,
      name: language === 'en' ? 'Jorge Salazar' : 'Jorge Salazar',
      visa: language === 'en' ? 'Work Visa for Australia' : 'Visa de Trabajo para Australia',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4,
      text: language === 'en'
        ? "Getting a skilled worker visa for Australia seemed like an impossible task until I found TAMEC. Their knowledge of the points system and suggested pathways saved me months of research. The process took longer than expected due to COVID delays, but TAMEC kept me updated throughout. Very professional service."
        : "Obtener una visa de trabajador calificado para Australia parecía una tarea imposible hasta que encontré TAMEC. Su conocimiento del sistema de puntos y las vías sugeridas me ahorró meses de investigación. El proceso tomó más tiempo del esperado debido a retrasos por COVID, pero TAMEC me mantuvo actualizado durante todo el proceso. Servicio muy profesional."
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Success Stories' : 'Casos de Éxito'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Don\'t just take our word for it. Hear from our clients who successfully obtained their visas with our help.' 
              : 'No solo tomes nuestra palabra. Escucha a nuestros clientes que obtuvieron con éxito sus visas con nuestra ayuda.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 flex flex-col h-full border border-border">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.visa}
                  </p>
                  <div className="flex mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic flex-grow">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-tamec-50 dark:bg-tamec-900/20 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">
            {language === 'en' ? 'Ready to Start Your Visa Journey?' : '¿Listo para Comenzar tu Viaje de Visa?'}
          </h3>
          <p className="mb-6 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Join our satisfied clients and let us help you navigate the visa application process with confidence.'
              : 'Únete a nuestros clientes satisfechos y déjanos ayudarte a navegar por el proceso de solicitud de visa con confianza.'}
          </p>
          <button className="bg-tamec-600 hover:bg-tamec-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
            {language === 'en' ? 'Schedule a Consultation' : 'Agendar una Consulta'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FlightFAQ = () => {
  const { language } = useLanguage();

  const faqs = [
    {
      question: language === 'en' ? 'Do you include taxes and airport fees?' : '¿Incluyen los impuestos y tasas aeroportuarias?',
      answer: language === 'en' 
        ? 'Yes. We always show you the final price, with no hidden charges. You won\'t pay anything extra at the airport or at your destination.'
        : 'Sí. Siempre te mostramos el precio final, sin cargos ocultos. No pagarás nada adicional en el aeropuerto ni en tu destino.'
    },
    {
      question: language === 'en' ? 'Can I request flights with specific layovers or preferred airlines?' : '¿Puedo pedir vuelos con escalas específicas o aerolíneas que prefiera?',
      answer: language === 'en'
        ? 'Of course! Our service is personalized. If you have scheduling preferences, specific layovers, or preferred airlines, we take that into account when searching for your flight.'
        : '¡Claro! Nuestro servicio es personalizado. Si tienes preferencias de horario, escalas o aerolíneas, lo tomamos en cuenta al buscar tu vuelo.'
    },
    {
      question: language === 'en' ? 'Do you do check-in for me?' : '¿Hacen check-in por mí?',
      answer: language === 'en'
        ? 'Yes, we perform online check-in so you don\'t have to wait in long lines at the airport. We send your boarding pass directly to your phone.'
        : 'Sí, realizamos el check-in online para que no tengas que hacer filas largas en el aeropuerto. Te enviamos tu pase de abordar directo al celular.'
    },
    {
      question: language === 'en' ? 'Do you work with all airlines?' : '¿Trabajan con todas las aerolíneas?',
      answer: language === 'en'
        ? 'Yes, we work with a global network of airlines, for both domestic and international flights.'
        : 'Sí, trabajamos con una red global de aerolíneas, tanto para vuelos nacionales como internacionales.'
    },
    {
      question: language === 'en' ? 'What happens if my flight requires a transit visa?' : '¿Qué pasa si mi vuelo tiene visado de tránsito?',
      answer: language === 'en'
        ? 'We advise you throughout the process. We explain if you need a visa for the layover and what options you have.'
        : 'Te asesoramos en todo el proceso. Te explicamos si necesitas visado para la escala y qué opciones tienes.'
    },
    {
      question: language === 'en' ? 'What is the cost of the service?' : '¿Cuál es el costo del servicio?',
      answer: language === 'en'
        ? 'From $20 for domestic flights. From $40 for flights within the Americas. From $50 for intercontinental flights.'
        : 'Desde $20 para vuelos nacionales. Desde $40 para vuelos en América. Desde $50 para vuelos intercontinentales.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Find answers to the most common questions about our flight booking service.'
              : 'Encuentra respuestas a las preguntas más comunes sobre nuestro servicio de reserva de vuelos.'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 dark:text-gray-300 pt-2">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FlightFAQ;

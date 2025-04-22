
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GalapagosFAQ = () => {
  const { language } = useLanguage();

  const faqs = [
    {
      question: language === 'en' ? 'Can I travel if I don\'t know how to swim?' : '¿Puedo viajar si no sé nadar?',
      answer: language === 'en'
        ? 'Yes, you can! There are many activities that don\'t require swimming. For water activities, life vests are always provided and guides are trained to assist non-swimmers.'
        : 'Sí, ¡puedes! Hay muchas actividades que no requieren nadar. Para actividades acuáticas, siempre se proporcionan chalecos salvavidas y los guías están capacitados para asistir a quienes no saben nadar.'
    },
    {
      question: language === 'en' ? 'What does the tour include?' : '¿Qué incluye el tour?',
      answer: language === 'en'
        ? 'Our packages include flights from Quito or Guayaquil, accommodation, full board meals, certified local guides, internal transfers, and tickets to tourist sites. Optional activities may have additional costs.'
        : 'Nuestros paquetes incluyen vuelos desde Quito o Guayaquil, alojamiento, alimentación completa, guías locales certificados, traslados internos y entradas a sitios turísticos. Las actividades opcionales pueden tener costos adicionales.'
    },
    {
      question: language === 'en' ? 'Can I pay in installments?' : '¿Puedo pagar a cuotas?',
      answer: language === 'en'
        ? 'Yes! We offer flexible payment options. You can secure your booking with a small deposit and pay the rest in installments up to 30 days before your trip.'
        : '¡Sí! Ofrecemos opciones de pago flexibles. Puedes asegurar tu reserva con un pequeño depósito y pagar el resto en cuotas hasta 30 días antes de tu viaje.'
    },
    {
      question: language === 'en' ? 'Do I need a visa or special permits?' : '¿Necesito visa o permisos especiales?',
      answer: language === 'en'
        ? 'Ecuadorian citizens don\'t need a visa. International visitors should check entry requirements for Ecuador. All visitors to Galapagos must pay a national park entrance fee upon arrival.'
        : 'Los ciudadanos ecuatorianos no necesitan visa. Los visitantes internacionales deben verificar los requisitos de entrada para Ecuador. Todos los visitantes a Galápagos deben pagar una tarifa de entrada al parque nacional a su llegada.'
    },
    {
      question: language === 'en' ? 'What\'s the weather like in Galapagos?' : '¿Cómo es el clima en Galápagos?',
      answer: language === 'en'
        ? 'Galapagos has two seasons: warm (January-May) with temperatures 24-30°C and occasional rain, and dry (June-December) with temperatures 19-26°C. The water is warmer during the warm season.'
        : 'Galápagos tiene dos estaciones: cálida (enero-mayo) con temperaturas de 24-30°C y lluvias ocasionales, y seca (junio-diciembre) con temperaturas de 19-26°C. El agua es más cálida durante la estación cálida.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default GalapagosFAQ;

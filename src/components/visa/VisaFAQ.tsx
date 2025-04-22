
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const VisaFAQ = () => {
  const { language } = useLanguage();
  
  const faqs = [
    {
      id: 'approval',
      question: language === 'en' 
        ? 'Do you guarantee visa approval?' 
        : '¿Garantizan la aprobación de la visa?',
      answer: language === 'en'
        ? 'No visa service can guarantee approval, as the final decision rests with immigration officials. However, our expertise significantly increases your chances by ensuring your application is properly prepared and presented.'
        : 'Ningún servicio de visa puede garantizar la aprobación, ya que la decisión final corresponde a los funcionarios de inmigración. Sin embargo, nuestra experiencia aumenta significativamente tus posibilidades al asegurar que tu solicitud esté adecuadamente preparada y presentada.'
    },
    {
      id: 'processing-time',
      question: language === 'en' 
        ? 'How long does the visa process take?' 
        : '¿Cuánto tiempo toma el proceso de visa?',
      answer: language === 'en'
        ? 'Processing times vary significantly by country, visa type, and current workload at embassies. Generally, it ranges from 2-8 weeks from start to finish. During your consultation, we can provide a more accurate timeline for your specific case.'
        : 'Los tiempos de procesamiento varían significativamente según el país, el tipo de visa y la carga de trabajo actual en las embajadas. Generalmente, oscila entre 2-8 semanas de principio a fin. Durante tu consulta, podemos proporcionar un cronograma más preciso para tu caso específico.'
    },
    {
      id: 'denial',
      question: language === 'en' 
        ? 'What happens if my visa application is denied?' 
        : '¿Qué sucede si mi solicitud de visa es rechazada?',
      answer: language === 'en'
        ? 'In case of denial, we provide a detailed analysis of the reasons and recommend the best course of action. This may include reapplying with stronger documentation, applying for a different visa category, or appealing the decision if applicable. We offer discounted rates for reapplications.'
        : 'En caso de negación, proporcionamos un análisis detallado de las razones y recomendamos el mejor curso de acción. Esto puede incluir volver a solicitar con documentación más sólida, solicitar una categoría de visa diferente o apelar la decisión si corresponde. Ofrecemos tarifas con descuento para nuevas solicitudes.'
    },
    {
      id: 'installments',
      question: language === 'en' 
        ? 'Can I pay for your services in installments?' 
        : '¿Puedo pagar por sus servicios en cuotas?',
      answer: language === 'en'
        ? 'Yes, we offer flexible payment plans for our comprehensive visa packages. Typically, payments are divided into 2-3 installments throughout the process. The specific plan can be discussed during your consultation.'
        : 'Sí, ofrecemos planes de pago flexibles para nuestros paquetes completos de visa. Normalmente, los pagos se dividen en 2-3 cuotas a lo largo del proceso. El plan específico puede ser discutido durante tu consulta.'
    },
    {
      id: 'interview-help',
      question: language === 'en' 
        ? 'Do you provide assistance for the visa interview?' 
        : '¿Proporcionan asistencia para la entrevista de visa?',
      answer: language === 'en'
        ? 'Absolutely! We provide comprehensive interview preparation, including mock interviews, likely questions specific to your case, guidance on appropriate attire, and strategies for answering difficult questions. This preparation is a key part of our service and significantly improves success rates.'
        : '¡Absolutamente! Proporcionamos preparación completa para la entrevista, incluyendo entrevistas simuladas, posibles preguntas específicas para tu caso, orientación sobre vestimenta apropiada y estrategias para responder preguntas difíciles. Esta preparación es una parte clave de nuestro servicio y mejora significativamente las tasas de éxito.'
    },
    {
      id: 'previous-denial',
      question: language === 'en' 
        ? 'Can you help if I was previously denied a visa?' 
        : '¿Pueden ayudar si anteriormente me negaron una visa?',
      answer: language === 'en'
        ? 'Yes, we specialize in cases with previous denials. Our experts analyze the specific reasons for rejection and develop strategies to address these concerns in a new application. While a previous denial can make the process more challenging, with the right approach and stronger documentation, many of our clients successfully obtain visas after initial rejections.'
        : 'Sí, nos especializamos en casos con negaciones previas. Nuestros expertos analizan las razones específicas del rechazo y desarrollan estrategias para abordar estas preocupaciones en una nueva solicitud. Si bien una negación previa puede hacer que el proceso sea más desafiante, con el enfoque correcto y documentación más sólida, muchos de nuestros clientes obtienen visas con éxito después de rechazos iniciales.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Find answers to the most common questions about our visa processing services.' 
              : 'Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de tramitación de visas.'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-white dark:bg-gray-800 border border-border rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en'
              ? 'Have more questions? Contact us directly for personalized assistance.'
              : '¿Tienes más preguntas? Contáctanos directamente para asistencia personalizada.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisaFAQ;

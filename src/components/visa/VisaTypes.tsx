
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Flag, Plane, Book, Briefcase, GraduationCap } from 'lucide-react';

const VisaTypes = () => {
  const { language } = useLanguage();
  
  const visaTypes = [
    {
      id: 'tourist',
      title: language === 'en' ? 'Tourist Visa' : 'Visa de Turismo',
      icon: <Flag className="h-6 w-6 text-tamec-600" />,
      description: language === 'en'
        ? 'For those traveling for leisure, visiting family or friends, or medical treatment.'
        : 'Para aquellos que viajan por ocio, visitan a familiares o amigos, o tratamiento médico.',
      requirements: [
        language === 'en' ? 'Valid passport with at least 6 months validity' : 'Pasaporte válido con al menos 6 meses de vigencia',
        language === 'en' ? 'Completed application form' : 'Formulario de solicitud completado',
        language === 'en' ? 'Proof of financial means' : 'Prueba de medios financieros',
        language === 'en' ? 'Round-trip ticket or travel itinerary' : 'Boleto de ida y vuelta o itinerario de viaje',
        language === 'en' ? 'Accommodation details' : 'Detalles de alojamiento',
      ],
      processingTime: language === 'en' ? '2-4 weeks' : '2-4 semanas',
      costs: language === 'en' ? '$160 - $250 USD' : '$160 - $250 USD',
      countries: language === 'en' 
        ? 'United States, Canada, European Union, United Kingdom, Australia, Mexico, and more.'
        : 'Estados Unidos, Canadá, Unión Europea, Reino Unido, Australia, México, y más.'
    },
    {
      id: 'study',
      title: language === 'en' ? 'Student Visa' : 'Visa de Estudios',
      icon: <GraduationCap className="h-6 w-6 text-tamec-600" />,
      description: language === 'en'
        ? 'For those who plan to study abroad, including language courses, undergraduate, graduate and research programs.'
        : 'Para aquellos que planean estudiar en el extranjero, incluyendo cursos de idiomas, programas de pregrado, posgrado e investigación.',
      requirements: [
        language === 'en' ? 'Valid passport with at least 6 months validity' : 'Pasaporte válido con al menos 6 meses de vigencia',
        language === 'en' ? 'Acceptance letter from educational institution' : 'Carta de aceptación de la institución educativa',
        language === 'en' ? 'Proof of financial means for study period' : 'Prueba de medios financieros para el período de estudio',
        language === 'en' ? 'Health insurance' : 'Seguro médico',
        language === 'en' ? 'Academic transcripts' : 'Expedientes académicos',
      ],
      processingTime: language === 'en' ? '3-8 weeks' : '3-8 semanas',
      costs: language === 'en' ? '$160 - $350 USD' : '$160 - $350 USD',
      countries: language === 'en'
        ? 'United States (F-1/M-1), Canada (Study Permit), European Union, United Kingdom (Tier 4), Australia, and more.'
        : 'Estados Unidos (F-1/M-1), Canadá (Permiso de Estudio), Unión Europea, Reino Unido (Tier 4), Australia, y más.'
    },
    {
      id: 'work',
      title: language === 'en' ? 'Work Visa' : 'Visa de Trabajo',
      icon: <Briefcase className="h-6 w-6 text-tamec-600" />,
      description: language === 'en'
        ? 'For those who have a job offer or employment contract with a company in the destination country.'
        : 'Para aquellos que tienen una oferta de trabajo o contrato laboral con una empresa en el país de destino.',
      requirements: [
        language === 'en' ? 'Valid passport with at least 6 months validity' : 'Pasaporte válido con al menos 6 meses de vigencia',
        language === 'en' ? 'Employment contract or job offer letter' : 'Contrato laboral o carta de oferta de trabajo',
        language === 'en' ? 'Educational qualifications and work experience' : 'Calificaciones educativas y experiencia laboral',
        language === 'en' ? 'Work permit approved by labor authorities' : 'Permiso de trabajo aprobado por autoridades laborales',
        language === 'en' ? 'Health insurance' : 'Seguro médico',
      ],
      processingTime: language === 'en' ? '1-6 months' : '1-6 meses',
      costs: language === 'en' ? '$190 - $800 USD' : '$190 - $800 USD',
      countries: language === 'en'
        ? 'United States (H-1B, L-1, etc.), Canada, European Union (Blue Card), United Kingdom, Australia (TSS), and more.'
        : 'Estados Unidos (H-1B, L-1, etc.), Canadá, Unión Europea (Tarjeta Azul), Reino Unido, Australia (TSS), y más.'
    },
    {
      id: 'business',
      title: language === 'en' ? 'Business Visa' : 'Visa de Negocios',
      icon: <Book className="h-6 w-6 text-tamec-600" />,
      description: language === 'en'
        ? 'For business meetings, conferences, trade fairs, contract negotiations, and other business-related activities.'
        : 'Para reuniones de negocios, conferencias, ferias comerciales, negociaciones de contratos y otras actividades relacionadas con negocios.',
      requirements: [
        language === 'en' ? 'Valid passport with at least 6 months validity' : 'Pasaporte válido con al menos 6 meses de vigencia',
        language === 'en' ? 'Business invitation letter' : 'Carta de invitación comercial',
        language === 'en' ? 'Proof of business relationship' : 'Prueba de relación comercial',
        language === 'en' ? 'Details of meetings or events' : 'Detalles de reuniones o eventos',
        language === 'en' ? 'Company letter stating purpose of trip' : 'Carta de la empresa indicando el propósito del viaje',
      ],
      processingTime: language === 'en' ? '2-4 weeks' : '2-4 semanas',
      costs: language === 'en' ? '$160 - $300 USD' : '$160 - $300 USD',
      countries: language === 'en'
        ? 'United States (B-1), Canada, European Union, United Kingdom, Australia, and more.'
        : 'Estados Unidos (B-1), Canadá, Unión Europea, Reino Unido, Australia, y más.'
    },
    {
      id: 'transit',
      title: language === 'en' ? 'Transit Visa' : 'Visa de Tránsito',
      icon: <Plane className="h-6 w-6 text-tamec-600" />,
      description: language === 'en'
        ? 'For short stays when passing through a country on the way to your final destination.'
        : 'Para estadías cortas al pasar por un país en el camino a tu destino final.',
      requirements: [
        language === 'en' ? 'Valid passport with at least 6 months validity' : 'Pasaporte válido con al menos 6 meses de vigencia',
        language === 'en' ? 'Visa for final destination (if required)' : 'Visa para destino final (si es requerida)',
        language === 'en' ? 'Confirmed flight tickets showing transit' : 'Boletos de avión confirmados que muestren el tránsito',
        language === 'en' ? 'Proof of sufficient funds for transit' : 'Prueba de fondos suficientes para el tránsito',
      ],
      processingTime: language === 'en' ? '1-3 weeks' : '1-3 semanas',
      costs: language === 'en' ? '$30 - $160 USD' : '$30 - $160 USD',
      countries: language === 'en'
        ? 'United Kingdom, European Union (Schengen Transit), China, India, Russia, and more.'
        : 'Reino Unido, Unión Europea (Tránsito Schengen), China, India, Rusia, y más.'
    }
  ];

  return (
    <section id="visa-types" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Types of Visas We Process' : 'Tipos de Visas que Tramitamos'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'We provide comprehensive support for various visa types, ensuring a smooth application process tailored to your specific needs.' 
              : 'Brindamos apoyo integral para varios tipos de visas, asegurando un proceso de solicitud sin problemas adaptado a tus necesidades específicas.'}
          </p>
        </div>

        <Tabs defaultValue="tourist" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
            {visaTypes.map((visa) => (
              <TabsTrigger key={visa.id} value={visa.id} className="flex items-center gap-2">
                {visa.icon}
                <span className="hidden md:inline">{visa.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {visaTypes.map((visa) => (
            <TabsContent key={visa.id} value={visa.id}>
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                    {visa.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{visa.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {visa.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold mb-2">
                      {language === 'en' ? 'Requirements' : 'Requisitos'}
                    </h4>
                    <ul className="space-y-2">
                      {visa.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-4 w-4 text-tamec-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-200">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">
                      {language === 'en' ? 'Processing Time' : 'Tiempo de Procesamiento'}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200">
                      {visa.processingTime}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">
                      {language === 'en' ? 'Approximate Costs' : 'Costos Aproximados'}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200">
                      {visa.costs}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">
                      {language === 'en' ? 'Applicable Countries' : 'Países Aplicables'}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200">
                      {visa.countries}
                    </p>
                  </div>
                </div>
                
                <div className="bg-tamec-50 dark:bg-tamec-900/20 p-4 rounded-md">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {language === 'en'
                      ? 'Note: Requirements, processing times, and costs may vary depending on your nationality, personal circumstances, and the specific country you are applying to. Contact us for a personalized assessment.'
                      : 'Nota: Los requisitos, tiempos de procesamiento y costos pueden variar según tu nacionalidad, circunstancias personales y el país específico al que estás solicitando. Contáctanos para una evaluación personalizada.'}
                  </p>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default VisaTypes;


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { MessageSquare, FileText, UserCheck, CreditCard, Calendar, Users, CheckCircle } from 'lucide-react';

const ProcessSteps = () => {
  const { language } = useLanguage();
  
  const steps = [
    {
      id: 1,
      icon: <MessageSquare className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Initial Contact' : 'Contacto Inicial',
      description: language === 'en' 
        ? 'Schedule a consultation to discuss your visa needs and get a personalized assessment.' 
        : 'Programa una consulta para discutir tus necesidades de visa y obtener una evaluación personalizada.',
      timeline: language === 'en' ? 'Day 1' : 'Día 1'
    },
    {
      id: 2,
      icon: <FileText className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Document Submission' : 'Envío de Documentos',
      description: language === 'en' 
        ? 'Provide the required documents based on your specific visa type and country requirements.' 
        : 'Proporciona los documentos requeridos según tu tipo específico de visa y requisitos del país.',
      timeline: language === 'en' ? 'Days 2-7' : 'Días 2-7'
    },
    {
      id: 3,
      icon: <UserCheck className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Advisory & Form Filling' : 'Asesoría y Llenado de Formularios',
      description: language === 'en' 
        ? 'Our experts review your documents and help you complete all required application forms correctly.' 
        : 'Nuestros expertos revisan tus documentos y te ayudan a completar todos los formularios de solicitud requeridos correctamente.',
      timeline: language === 'en' ? 'Days 7-14' : 'Días 7-14'
    },
    {
      id: 4,
      icon: <CreditCard className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Fee Payment' : 'Pago de Tasas',
      description: language === 'en' 
        ? 'Pay the applicable visa fees and service charges through our secure payment options.' 
        : 'Paga las tarifas de visa aplicables y cargos de servicio a través de nuestras opciones de pago seguras.',
      timeline: language === 'en' ? 'Day 14' : 'Día 14'
    },
    {
      id: 5,
      icon: <Calendar className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Appointment Scheduling' : 'Agendamiento de Cita',
      description: language === 'en' 
        ? 'We help you schedule your visa appointment at the embassy or consulate at a convenient time.' 
        : 'Te ayudamos a programar tu cita de visa en la embajada o consulado en un momento conveniente.',
      timeline: language === 'en' ? 'Days 15-21' : 'Días 15-21'
    },
    {
      id: 6,
      icon: <Users className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Interview Preparation' : 'Preparación para Entrevista',
      description: language === 'en' 
        ? 'Receive coaching and guidance on what to expect during your visa interview with mock interviews.' 
        : 'Recibe entrenamiento y orientación sobre qué esperar durante tu entrevista de visa con entrevistas simuladas.',
      timeline: language === 'en' ? 'Days 21-28' : 'Días 21-28'
    },
    {
      id: 7,
      icon: <CheckCircle className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Result & Follow-up' : 'Resultado y Seguimiento',
      description: language === 'en' 
        ? 'We assist with tracking your application and provide guidance on next steps after the decision.' 
        : 'Ayudamos con el seguimiento de tu solicitud y proporcionamos orientación sobre los próximos pasos después de la decisión.',
      timeline: language === 'en' ? 'Days 28+' : 'Días 28+'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'How the Process Works' : 'Cómo Funciona el Proceso'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Our streamlined visa application process ensures a hassle-free experience from start to finish.' 
              : 'Nuestro proceso simplificado de solicitud de visa garantiza una experiencia sin complicaciones de principio a fin.'}
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-tamec-200 dark:bg-tamec-800"></div>
          
          {/* Timeline Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step Number for Mobile */}
                <div className="md:hidden absolute left-0 top-0 w-8 h-8 bg-tamec-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.id}
                </div>
                
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="md:w-1/2 pl-12 md:pl-0 md:px-6">
                    <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {step.description}
                      </p>
                      <div className="text-sm font-medium text-tamec-600">
                        {step.timeline}
                      </div>
                    </Card>
                  </div>
                  
                  {/* Center Circle for Desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 bg-tamec-600 text-white rounded-full flex items-center justify-center font-bold z-10">
                      {step.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 p-6 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-sm">
          <h4 className="text-xl font-bold mb-4 text-center">
            {language === 'en' ? 'Estimated Timeline' : 'Cronograma Estimado'}
          </h4>
          <p className="text-center text-gray-600 dark:text-gray-300">
            {language === 'en'
              ? 'The entire process typically takes 4-8 weeks from initial consultation to visa decision, depending on the country and visa type. Emergency processing is available for certain cases.'
              : 'Todo el proceso generalmente toma de 4 a 8 semanas desde la consulta inicial hasta la decisión de visa, dependiendo del país y tipo de visa. Procesamiento de emergencia está disponible para ciertos casos.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;

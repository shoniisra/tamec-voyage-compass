
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const GuaranteePolicy = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 border border-border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tamec-50 dark:bg-tamec-900/20 rounded-bl-full"></div>
            
            <div className="flex items-center mb-6 relative z-10">
              <div className="p-3 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-4">
                <ShieldCheck className="h-8 w-8 text-tamec-600" />
              </div>
              <h2 className="text-2xl font-bold">
                {language === 'en' ? 'Our Guarantee & Refund Policy' : 'Nuestra Garantía y Política de Reembolsos'}
              </h2>
            </div>
            
            <div className="space-y-4 relative z-10">
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en'
                  ? 'While we cannot guarantee visa approval (as final decisions rest with immigration authorities), we are committed to providing the highest quality service and maximizing your chances of success.'
                  : 'Si bien no podemos garantizar la aprobación de la visa (ya que las decisiones finales dependen de las autoridades de inmigración), estamos comprometidos a proporcionar un servicio de la más alta calidad y maximizar tus posibilidades de éxito.'}
              </p>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">
                  {language === 'en' ? 'Our Service Guarantee Includes:' : 'Nuestra Garantía de Servicio Incluye:'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Thorough document review and preparation to meet all embassy requirements'
                        : 'Revisión y preparación exhaustiva de documentos para cumplir con todos los requisitos de la embajada'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Honest assessment of your chances based on your specific situation'
                        : 'Evaluación honesta de tus posibilidades basada en tu situación específica'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Expert guidance throughout the entire process'
                        : 'Orientación experta durante todo el proceso'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Timely responses to all your inquiries within 24 hours'
                        : 'Respuestas oportunas a todas tus consultas dentro de las 24 horas'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">
                  {language === 'en' ? 'Refund Policy:' : 'Política de Reembolso:'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Full refund if we do not submit your application within the timeframe specified in our service agreement'
                        : 'Reembolso completo si no presentamos tu solicitud dentro del plazo especificado en nuestro acuerdo de servicio'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? '50% refund if we make a critical error in your application that directly leads to a denial'
                        : '50% de reembolso si cometemos un error crítico en tu solicitud que conduzca directamente a una negación'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'No refund for visa application fees paid to embassies or government agencies'
                        : 'Sin reembolso por tasas de solicitud de visa pagadas a embajadas o agencias gubernamentales'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-tamec-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Free consultation for next steps if your application is denied'
                        : 'Consulta gratuita para los próximos pasos si tu solicitud es negada'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 p-4 bg-tamec-50 dark:bg-tamec-900/20 rounded-md">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {language === 'en'
                    ? 'Note: Detailed terms and conditions will be provided in your service agreement. Our guarantee applies only to our services and not to the final decision made by immigration authorities.'
                    : 'Nota: Los términos y condiciones detallados se proporcionarán en tu acuerdo de servicio. Nuestra garantía se aplica solo a nuestros servicios y no a la decisión final tomada por las autoridades de inmigración.'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GuaranteePolicy;

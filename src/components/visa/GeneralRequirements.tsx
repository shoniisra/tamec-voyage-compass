
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { FileText, CreditCard, Camera, Briefcase, DollarSign, File } from 'lucide-react';

const GeneralRequirements = () => {
  const { language } = useLanguage();
  
  const requirements = [
    {
      id: 1,
      icon: <FileText className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Valid Passport' : 'Pasaporte Vigente',
      description: language === 'en' 
        ? 'Must be valid for at least 6 months beyond your planned stay, with at least 2 blank pages.' 
        : 'Debe ser válido por al menos 6 meses más allá de su estancia planeada, con al menos 2 páginas en blanco.'
    },
    {
      id: 2,
      icon: <Camera className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Recent Photo' : 'Foto Reciente',
      description: language === 'en' 
        ? 'Passport-sized photos with specific requirements depending on the country.' 
        : 'Fotos tamaño pasaporte con requisitos específicos según el país.'
    },
    {
      id: 3,
      icon: <File className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'DS-160 Form' : 'Formulario DS-160',
      description: language === 'en' 
        ? 'For U.S. visas, the Online Nonimmigrant Visa Application must be completed.' 
        : 'Para visas estadounidenses, debe completarse la Solicitud de Visa de No Inmigrante en línea.'
    },
    {
      id: 4,
      icon: <Briefcase className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Employment Letter' : 'Carta de Trabajo',
      description: language === 'en' 
        ? 'Proof of employment, income, and approved leave during your travel dates.' 
        : 'Prueba de empleo, ingresos y permiso aprobado durante sus fechas de viaje.'
    },
    {
      id: 5,
      icon: <DollarSign className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Financial Proof' : 'Prueba Financiera',
      description: language === 'en' 
        ? 'Bank statements showing sufficient funds to cover your entire trip.' 
        : 'Estados de cuenta bancarios que muestren fondos suficientes para cubrir todo su viaje.'
    },
    {
      id: 6,
      icon: <CreditCard className="h-6 w-6 text-tamec-600" />,
      title: language === 'en' ? 'Additional Documents' : 'Documentos Adicionales',
      description: language === 'en' 
        ? 'Travel itinerary, hotel reservations, invitation letters, and other documents depending on your case.' 
        : 'Itinerario de viaje, reservas de hotel, cartas de invitación y otros documentos según su caso.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'General Requirements' : 'Requisitos Generales'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'While specific requirements vary by country and visa type, here are the general documents needed for most visa applications:' 
              : 'Aunque los requisitos específicos varían según el país y el tipo de visa, estos son los documentos generales necesarios para la mayoría de las solicitudes de visa:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((requirement) => (
            <Card key={requirement.id} className="p-6 border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                  {requirement.icon}
                </div>
                <h3 className="text-xl font-bold">{requirement.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {requirement.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-sm">
          <h4 className="text-xl font-bold mb-4 text-center">
            {language === 'en' ? 'Important Notes' : 'Notas Importantes'}
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-tamec-600 mr-2">•</span>
              <span>
                {language === 'en'
                  ? 'Requirements vary significantly between countries and visa types. We will provide a detailed list specific to your case.'
                  : 'Los requisitos varían significativamente entre países y tipos de visa. Le proporcionaremos una lista detallada específica para su caso.'}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-tamec-600 mr-2">•</span>
              <span>
                {language === 'en'
                  ? 'All documents not in the official language of the destination country typically need translation.'
                  : 'Todos los documentos que no estén en el idioma oficial del país de destino generalmente necesitan traducción.'}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-tamec-600 mr-2">•</span>
              <span>
                {language === 'en'
                  ? 'Some countries require documents to be apostilled or legalized.'
                  : 'Algunos países requieren que los documentos sean apostillados o legalizados.'}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-tamec-600 mr-2">•</span>
              <span>
                {language === 'en'
                  ? 'Our team will review all your documents to ensure they meet the specific requirements of your application.'
                  : 'Nuestro equipo revisará todos sus documentos para asegurarse de que cumplan con los requisitos específicos de su solicitud.'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GeneralRequirements;

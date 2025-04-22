
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Map, Globe, MapPin } from 'lucide-react';

const LocationCoverage = () => {
  const { language } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Location & Coverage' : 'Ubicación y Cobertura'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Learn about our physical offices and service coverage areas to determine how we can best assist you.' 
              : 'Conoce nuestras oficinas físicas y áreas de cobertura de servicio para determinar cómo podemos ayudarte mejor.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-6 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                <MapPin className="h-6 w-6 text-tamec-600" />
              </div>
              <h3 className="text-xl font-bold">
                {language === 'en' ? 'Physical Office' : 'Oficina Física'}
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en'
                  ? 'Our main office is located in the heart of the city, easily accessible by public transportation. We welcome in-person consultations by appointment.'
                  : 'Nuestra oficina principal está ubicada en el corazón de la ciudad, fácilmente accesible por transporte público. Damos la bienvenida a consultas en persona con cita previa.'}
              </p>
              <div>
                <h4 className="font-semibold mb-2">{language === 'en' ? 'Address:' : 'Dirección:'}</h4>
                <p className="text-gray-700 dark:text-gray-200">
                  123 Main Street, Suite 450<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
              <div className="h-60 w-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                {/* Embed a map here if desired */}
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Map className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                <Globe className="h-6 w-6 text-tamec-600" />
              </div>
              <h3 className="text-xl font-bold">
                {language === 'en' ? 'Online Services' : 'Servicios en Línea'}
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en'
                  ? 'Our visa processing services are available 100% online for clients worldwide. We serve clients regardless of their location through our secure digital platform.'
                  : 'Nuestros servicios de procesamiento de visas están disponibles 100% en línea para clientes en todo el mundo. Atendemos a clientes independientemente de su ubicación a través de nuestra plataforma digital segura.'}
              </p>
              <div>
                <h4 className="font-semibold mb-2">{language === 'en' ? 'Online Features:' : 'Características en Línea:'}</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'Secure document upload' : 'Carga segura de documentos'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'Virtual consultations' : 'Consultas virtuales'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'Real-time application tracking' : 'Seguimiento de solicitud en tiempo real'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'Encrypted messaging system' : 'Sistema de mensajería encriptado'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'Digital payment options' : 'Opciones de pago digital'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-tamec-50 dark:bg-tamec-900 mr-3">
                <Map className="h-6 w-6 text-tamec-600" />
              </div>
              <h3 className="text-xl font-bold">
                {language === 'en' ? 'Service Coverage' : 'Cobertura de Servicio'}
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en'
                  ? 'We provide visa processing services to clients from all countries, with specialized expertise in certain regions and visa types.'
                  : 'Proporcionamos servicios de procesamiento de visas a clientes de todos los países, con experiencia especializada en ciertas regiones y tipos de visas.'}
              </p>
              <div>
                <h4 className="font-semibold mb-2">{language === 'en' ? 'Specialized Regions:' : 'Regiones Especializadas:'}</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'North America (US, Canada, Mexico)' : 'América del Norte (EE.UU., Canadá, México)'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'European Union & Schengen Area' : 'Unión Europea y Área Schengen'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'United Kingdom & Commonwealth' : 'Reino Unido y Commonwealth'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'Australia & New Zealand' : 'Australia y Nueva Zelanda'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tamec-600 mr-2">•</span>
                    <span>{language === 'en' ? 'Asia (Japan, China, UAE, etc.)' : 'Asia (Japón, China, EAU, etc.)'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-sm text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en'
              ? 'Whether you visit us in person or work with us remotely, our team is dedicated to providing the same high level of service and expertise to ensure your visa application has the best chance of success.'
              : 'Ya sea que nos visites en persona o trabajes con nosotros de forma remota, nuestro equipo está dedicado a proporcionar el mismo alto nivel de servicio y experiencia para garantizar que tu solicitud de visa tenga la mejor oportunidad de éxito.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationCoverage;

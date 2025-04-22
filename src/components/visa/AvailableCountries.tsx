
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Flag } from 'lucide-react';

const AvailableCountries = () => {
  const { language } = useLanguage();
  
  const countries = [
    {
      id: 'usa',
      name: language === 'en' ? 'United States' : 'Estados Unidos',
      flag: '🇺🇸',
      key: language === 'en' ? 'Most requested visas' : 'Visas más solicitadas',
      value: language === 'en' ? 'Tourist (B-2), Business (B-1), Student (F-1)' : 'Turismo (B-2), Negocios (B-1), Estudiante (F-1)'
    },
    {
      id: 'canada',
      name: language === 'en' ? 'Canada' : 'Canadá',
      flag: '🇨🇦',
      key: language === 'en' ? 'Most requested visas' : 'Visas más solicitadas',
      value: language === 'en' ? 'Tourist, Study Permit, Work Permit' : 'Turismo, Permiso de Estudio, Permiso de Trabajo'
    },
    {
      id: 'schengen',
      name: language === 'en' ? 'Schengen Area' : 'Área Schengen',
      flag: '🇪🇺',
      key: language === 'en' ? 'Includes' : 'Incluye',
      value: language === 'en' ? '26 European countries including Spain, France, Germany, Italy' : '26 países europeos incluyendo España, Francia, Alemania, Italia'
    },
    {
      id: 'uk',
      name: language === 'en' ? 'United Kingdom' : 'Reino Unido',
      flag: '🇬🇧',
      key: language === 'en' ? 'Most requested visas' : 'Visas más solicitadas',
      value: language === 'en' ? 'Standard Visitor, Student, Skilled Worker' : 'Visitante Estándar, Estudiante, Trabajador Calificado'
    },
    {
      id: 'mexico',
      name: language === 'en' ? 'Mexico' : 'México',
      flag: '🇲🇽',
      key: language === 'en' ? 'Most requested visas' : 'Visas más solicitadas',
      value: language === 'en' ? 'Tourist, Temporary Resident, Work Permit' : 'Turismo, Residente Temporal, Permiso de Trabajo'
    },
    {
      id: 'australia',
      name: language === 'en' ? 'Australia' : 'Australia',
      flag: '🇦🇺',
      key: language === 'en' ? 'Most requested visas' : 'Visas más solicitadas',
      value: language === 'en' ? 'Tourist, Student, Working Holiday' : 'Turismo, Estudiante, Vacaciones y Trabajo'
    },
    {
      id: 'japan',
      name: language === 'en' ? 'Japan' : 'Japón',
      flag: '🇯🇵',
      key: language === 'en' ? 'Most requested visas' : 'Visas más solicitadas',
      value: language === 'en' ? 'Tourist, Business, Student' : 'Turismo, Negocios, Estudiante'
    },
    {
      id: 'china',
      name: language === 'en' ? 'China' : 'China',
      flag: '🇨🇳',
      key: language === 'en' ? 'Most requested visas' : 'Visas más solicitadas',
      value: language === 'en' ? 'Tourist (L), Business (M), Work (Z)' : 'Turismo (L), Negocios (M), Trabajo (Z)'
    },
    {
      id: 'uae',
      name: language === 'en' ? 'United Arab Emirates' : 'Emiratos Árabes Unidos',
      flag: '🇦🇪',
      key: language === 'en' ? 'Most requested visas' : 'Visas más solicitadas',
      value: language === 'en' ? 'Tourist, Business, Work Permit' : 'Turismo, Negocios, Permiso de Trabajo'
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Available Countries' : 'Países Disponibles'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'We offer visa processing services for a wide range of countries. Here are some of the most popular destinations we work with:' 
              : 'Ofrecemos servicios de tramitación de visas para una amplia gama de países. Estos son algunos de los destinos más populares con los que trabajamos:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card key={country.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex items-center p-6 border-b">
                <span className="text-4xl mr-4">{country.flag}</span>
                <h3 className="text-xl font-bold">{country.name}</h3>
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {country.key}:
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  {country.value}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en'
              ? 'In addition to the countries listed above, we can assist with visa applications for many other destinations. Contact us for more information about your specific needs.'
              : 'Además de los países mencionados anteriormente, podemos ayudar con solicitudes de visa para muchos otros destinos. Contáctanos para obtener más información sobre tus necesidades específicas.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AvailableCountries;


import React from 'react';
import { Mail, MapPinned, Phone, Clock, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactInfo = () => {
  
  const { t, language } = useLanguage();
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 dark:bg-gray-800">
      <h3 className="text-xl font-bold mb-6">
      {language === 'en' 
                    ? 'Contact Information'
                    : 'Información de Contacto'}
                    </h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-tamec-50 p-3 rounded-full mr-4">
            <MapPinned className="h-6 w-6 text-tamec-600" />
            
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1 text-left"> 
              {language === 'en' 
                    ? 'Direction'
                    : 'Dirección'}</h4>
            <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' 
                    ? 'Quito, Ecuador - Francisco Ruiz & Jorge Gutiérrez Ave.'
                    : 'Quito, Ecuador - Av. Francisco Ruiz y Jorge Gutiérrez'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-tamec-50 p-3 rounded-full mr-4">
            <Mail className="h-6 w-6 text-tamec-600" />
          </div>
          <div>
            <h4 className=" text-left font-semibold text-lg mb-1">
            {language === 'en' 
                    ? 'Email Us'
                    : 'Mándanos un Correo'}</h4>
            <p className="text-tamec-600 hover:underline">tamecviajes@gmail.com</p>
            {/* <p className="text-tamec-600 hover:underline">support@tamectravel.com</p> */}
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-tamec-50 p-3 rounded-full mr-4">
            <Phone className="h-6 w-6 text-tamec-600" />
          </div>
          <div>
            <h4 className=" text-left font-semibold text-lg mb-1">
            {language === 'en' 
                    ? 'Call Us'
                    : 'Llámanos'}</h4>
            <p className="text-gray-600 dark:text-gray-300">+593 999 778 220</p>
            {/* <p className="text-gray-600 dark:text-gray-300">+1 (555) 987-6543</p> */}
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-tamec-50 p-3 rounded-full mr-4">
            <Clock className="h-6 w-6 text-tamec-600" />
          </div>
          <div>
            <h4 className=" text-left font-semibold text-lg mb-1">
            {language === 'en' 
                    ? 'Office Hours'
                    : 'Horario de Atención'}</h4>
            <p className=" text-left ml-2 text-gray-600 dark:text-gray-300">
            {language === 'en' 
                    ? 'Monday - Friday: 9:00 AM - 6:00 PM'
                    : 'Lunes - Viernes: 9:00 AM - 6:00 PM'}</p>
            <p className=" text-left ml-2 text-gray-600 dark:text-gray-300">
            {language === 'en' 
                    ? 'Saturday: 9:00 AM - 13:00 PM'
                    : 'Saturday: 9:00 AM - 13:00 PM'}</p>
            <p className=" text-left ml-2 text-gray-600 dark:text-gray-300">
            {language === 'en' 
                    ? 'Sunday: Closed'
                    : 'Domingo: Cerrado'}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="font-semibold text-lg mb-3">
        {language === 'en' 
                    ? 'Connect With Us'
                    : 'Siguenos en'}
                    </h4>
        <div className="flex space-x-4">
          <a 
            href="https://www.facebook.com/tamecviajes" 
            className="bg-tamec-50 hover:bg-tamec-100 p-3 rounded-full transition-colors"
            aria-label="Facebook"
          >
            <svg className="h-5 w-5 text-tamec-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          
          <a 
            href="https://www.tiktok.com/@tamecviajes" 
            className="bg-tamec-50 hover:bg-tamec-100 p-3 rounded-full transition-colors"
            aria-label="Tiktok"
          >
        
        <svg className="h-5 w-5 text-tamec-600" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M176 32c-13.25 0-24-10.75-24-24h-32v144a24 24 0 1 1-24-24v-32a56 56 0 1 0 56 56V86.1a89.6 89.6 0 0 0 48 13.9V64a32 32 0 0 1-24-32z" />
</svg>


          </a>
          
          <a 
            href="https://www.instagram.com/tamecviajes/" 
            className="bg-tamec-50 hover:bg-tamec-100 p-3 rounded-full transition-colors text-tamec-600"
            aria-label="Instagram"
          >
             <Instagram size={20}  />
          </a>
          
          {/* <a 
            href="https://linkedin.com" 
            className="bg-tamec-50 hover:bg-tamec-100 p-3 rounded-full transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-5 w-5 text-tamec-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

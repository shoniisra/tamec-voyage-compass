
import React from 'react';
import Layout from '@/components/layout/Layout';
import { ContactForm, ContactInfo } from '@/modules/contact/components';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';

const SpanishContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Helmet>
        <title>Contáctenos | TAMEC Agencia de Viajes</title>
        <meta name="description" content="Contacte a TAMEC Agencia de Viajes para obtener información sobre nuestros servicios, tours o para planificar su próxima aventura." />
        <link rel="canonical" href="https://tamecviajes.com/es/contacto" />
        <meta property="og:title" content="Contáctenos | TAMEC Agencia de Viajes" />
        <meta property="og:description" content="Contacte a TAMEC Agencia de Viajes para obtener información sobre nuestros servicios, tours o para planificar su próxima aventura." />
        <meta property="og:url" content="https://tamecviajes.com/es/contacto" />
      </Helmet>
      
      <div className="bg-tamec-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('contact.title')}</h1>
          <p className="text-tamec-100 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h2>
            <p className="text-gray-600 mb-6">
              {t('contact.form.description')}
            </p>
            <ContactForm />
          </div>
          
          <div>
            <ContactInfo />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('contact.findUs')}</h2>
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8134795886517!2d-78.47564812471707!3d-0.08925193548987914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58fdf1e86e569%3A0xcb337ecf00382659!2sAgencia%20de%20viajes%20TAMEC!5e0!3m2!1sen!2sec!4v1744712152248!5m2!1sen!2sec" 
              width="100%" 
              height="600" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Oficina TAMEC"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpanishContactPage;

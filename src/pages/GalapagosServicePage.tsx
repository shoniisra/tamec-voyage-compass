
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import GalapagosHero from '@/components/galapagos/GalapagosHero';
import GalapagosBenefits from '@/components/galapagos/GalapagosBenefits';
import GalapagosDestinations from '@/components/galapagos/GalapagosDestinations';
import GalapagosActivities from '@/components/galapagos/GalapagosActivities';
import GalapagosTestimonials from '@/components/galapagos/GalapagosTestimonials';
import GalapagosFAQ from '@/components/galapagos/GalapagosFAQ';
import GalapagosCallToAction from '@/components/galapagos/GalapagosCallToAction';
import GalapagosGallery from '@/components/galapagos/GalapagosGallery';

const GalapagosServicePage = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <GalapagosHero />
      <GalapagosBenefits />
      <GalapagosActivities />
      <GalapagosDestinations />
      <GalapagosGallery />
      <GalapagosFAQ />
      <GalapagosTestimonials />
      <GalapagosCallToAction />
    </Layout>
  );
};

export default GalapagosServicePage;

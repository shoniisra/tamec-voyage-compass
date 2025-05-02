
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import GalapagosHero from '@/components/galapagos/GalapagosHero';
import GalapagosBenefits from '@/components/galapagos/GalapagosBenefits';
import GalapagosDestinations from '@/components/galapagos/GalapagosDestinations';
import GalapagosActivities from '@/components/galapagos/GalapagosActivities';
import GalapagosTestimonials from '@/components/galapagos/GalapagosTestimonials';
import GalapagosFAQ from '@/components/galapagos/GalapagosFAQ';
import GalapagosCallToAction from '@/components/galapagos/GalapagosCallToAction';
import GalapagosGallery from '@/components/galapagos/GalapagosGallery';

const EnglishGalapagosServicePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Galapagos Islands Tours | TAMEC Travel</title>
        <meta name="description" content="Experience the unique wildlife and breathtaking landscapes of the Galapagos Islands with our specialized tours. All-inclusive packages with expert guides." />
        <meta property="og:title" content="Galapagos Islands Tours | TAMEC Travel" />
        <meta property="og:description" content="Discover the Galapagos Islands with our specialized tours featuring unique wildlife experiences and breathtaking landscapes. Expert guides and all-inclusive packages." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/en/services/galapagos" />
        <html lang="en" />
      </Helmet>
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

export default EnglishGalapagosServicePage;

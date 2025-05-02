
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

const SpanishGalapagosServicePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Tours a Islas Galápagos | TAMEC Viajes</title>
        <meta name="description" content="Experimente la vida silvestre única y los impresionantes paisajes de las Islas Galápagos con nuestros tours especializados. Paquetes todo incluido con guías expertos." />
        <meta property="og:title" content="Tours a Islas Galápagos | TAMEC Viajes" />
        <meta property="og:description" content="Descubra las Islas Galápagos con nuestros tours especializados con experiencias únicas de vida silvestre y paisajes impresionantes. Guías expertos y paquetes todo incluido." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/es/servicios/galapagos" />
        <html lang="es" />
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

export default SpanishGalapagosServicePage;

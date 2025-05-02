
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import FlightHero from '@/components/flights/FlightHero';
import AirlineLogos from '@/components/flights/AirlineLogos';
import FlightBenefits from '@/components/flights/FlightBenefits';
import ServiceIncludes from '@/components/flights/ServiceIncludes';
import DestinationCoverage from '@/components/flights/DestinationCoverage';
import ServicePricing from '@/components/flights/ServicePricing';
import WhyBookWithUs from '@/components/flights/WhyBookWithUs';
import ProcessSteps from '@/components/flights/ProcessSteps';
import FlightFAQ from '@/components/flights/FlightFAQ';
import FlightCallToAction from '@/components/flights/FlightCallToAction';
import PopularDestinations from '@/components/flights/PopularDestinations';

const SpanishFlightServicePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Servicios de Boletos Aéreos | TAMEC Viajes</title>
        <meta name="description" content="Reserve vuelos a destinos en todo el mundo con TAMEC Viajes. Ofrecemos tarifas competitivas, opciones flexibles y servicio personalizado para todas sus necesidades de vuelo." />
        <meta property="og:title" content="Servicios de Boletos Aéreos | TAMEC Viajes" />
        <meta property="og:description" content="Reserve vuelos a destinos mundiales con tarifas competitivas, opciones flexibles y servicio personalizado para todas sus necesidades de viaje." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/es/servicios/vuelos" />
        <html lang="es" />
      </Helmet>
      <FlightHero />
      <AirlineLogos />
      <FlightBenefits />
      <ServiceIncludes />
      <DestinationCoverage />
      <ServicePricing />
      <WhyBookWithUs />
      <ProcessSteps />
      <FlightFAQ />
      <FlightCallToAction />
      <PopularDestinations />
    </Layout>
  );
};

export default SpanishFlightServicePage;


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

const EnglishFlightServicePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Flight Booking Services | TAMEC Travel</title>
        <meta name="description" content="Book flights to worldwide destinations with TAMEC Travel. We offer competitive rates, flexible options, and personalized service for all your flight needs." />
        <meta property="og:title" content="Flight Booking Services | TAMEC Travel" />
        <meta property="og:description" content="Book flights to worldwide destinations with competitive rates, flexible options, and personalized service for all your travel needs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/en/services/flights" />
        <html lang="en" />
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

export default EnglishFlightServicePage;

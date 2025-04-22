
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
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

const FlightServicePage = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
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

export default FlightServicePage;

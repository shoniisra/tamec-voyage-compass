
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import VisaHero from '@/components/visa/VisaHero';
import VisaIntroduction from '@/components/visa/VisaIntroduction';
import VisaTypes from '@/components/visa/VisaTypes';
import AvailableCountries from '@/components/visa/AvailableCountries';
import GeneralRequirements from '@/components/visa/GeneralRequirements';
import ProcessSteps from '@/components/visa/ProcessSteps';
import VisaFAQ from '@/components/visa/VisaFAQ';
import Testimonials from '@/components/visa/Testimonials';
import PricingPackages from '@/components/visa/PricingPackages';
import ContactSection from '@/components/visa/ContactSection';
import GuaranteePolicy from '@/components/visa/GuaranteePolicy';
import ImportantNotices from '@/components/visa/ImportantNotices';
import LocationCoverage from '@/components/visa/LocationCoverage';

const VisaProcessingPage = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <VisaHero />
      <VisaIntroduction />
      <VisaTypes />
      <AvailableCountries />
      <GeneralRequirements />
      <ProcessSteps />
      <VisaFAQ />
      <Testimonials />
      <PricingPackages />
      <ContactSection />
      <GuaranteePolicy />
      <ImportantNotices />
      <LocationCoverage />
    </Layout>
  );
};

export default VisaProcessingPage;

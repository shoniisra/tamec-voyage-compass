
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
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

const EnglishVisaProcessingPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Visa Processing Services | TAMEC Travel</title>
        <meta name="description" content="Professional visa processing services for USA, Europe, and other countries. Expert assistance for all types of visas with high approval rates." />
        <meta property="og:title" content="Visa Processing Services | TAMEC Travel" />
        <meta property="og:description" content="Professional visa processing services with expert assistance for all types of visas. High approval rates for USA, Europe, and more." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/en/services/visa-processing" />
        <html lang="en" />
      </Helmet>
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

export default EnglishVisaProcessingPage;

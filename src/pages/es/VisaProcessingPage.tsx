
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

const SpanishVisaProcessingPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Servicios de Trámite de Visas | TAMEC Viajes</title>
        <meta name="description" content="Servicios profesionales de trámite de visas para EE.UU., Europa y otros países. Asistencia especializada para todo tipo de visas con altas tasas de aprobación." />
        <meta property="og:title" content="Servicios de Trámite de Visas | TAMEC Viajes" />
        <meta property="og:description" content="Servicios profesionales de trámite de visas con asistencia especializada para todo tipo de visas. Altas tasas de aprobación para EE.UU., Europa y más." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/es/servicios/tramite-de-visas" />
        <html lang="es" />
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

export default SpanishVisaProcessingPage;

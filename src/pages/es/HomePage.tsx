
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import ServicesSection from '@/components/home/ServicesSection';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSection from '@/components/home/NewsletterSection';
import { Helmet } from 'react-helmet-async';

const SpanishHomePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sobre Nosotros | TAMEC Agencia de Viajes</title>
        <meta name="description" content="Conozca sobre TAMEC Agencia de Viajes, nuestra misión y valores. Ayudamos a los viajeros a descubrir el mundo a través de experiencias increíbles." />
        <link rel="canonical" href="https://tamecviajes.com/es/sobre-nosotros" />
        <meta property="og:title" content="Sobre Nosotros | TAMEC Agencia de Viajes" />
        <meta property="og:description" content="Conozca sobre TAMEC Agencia de Viajes, nuestra misión y valores. Ayudamos a los viajeros a descubrir el mundo a través de experiencias increíbles." />
        <meta property="og:url" content="https://tamecviajes.com/es/sobre-nosotros" />
      </Helmet>
      <HeroSection />
      <FeaturedDestinations />
      <ServicesSection />
      <Testimonials />
      <NewsletterSection />
    </Layout>
  );
};

export default SpanishHomePage;

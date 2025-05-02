
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import ServicesSection from '@/components/home/ServicesSection';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSection from '@/components/home/NewsletterSection';
import { Helmet } from 'react-helmet-async';

const EnglishHomePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us | TAMEC Travel Agency</title>
        <meta name="description" content="Learn about TAMEC Travel Agency, our mission and values. We help travelers discover the world through amazing experiences." />
        <link rel="canonical" href="https://tamecviajes.com/en/about-us" />
        <meta property="og:title" content="About Us | TAMEC Travel Agency" />
        <meta property="og:description" content="Learn about TAMEC Travel Agency, our mission and values. We help travelers discover the world through amazing experiences." />
        <meta property="og:url" content="https://tamecviajes.com/en/about-us" />
      </Helmet>
      <HeroSection />
      <FeaturedDestinations />
      <ServicesSection />
      <Testimonials />
      <NewsletterSection />
    </Layout>
  );
};

export default EnglishHomePage;

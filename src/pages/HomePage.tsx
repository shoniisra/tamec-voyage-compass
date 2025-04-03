
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import TravelPackages from '@/components/home/TravelPackages';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSection from '@/components/home/NewsletterSection';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedDestinations />
      <TravelPackages />
      <Testimonials />
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;

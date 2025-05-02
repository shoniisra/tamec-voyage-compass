
import React from 'react';
import { GetServerSideProps } from 'next';
import { generateSitemap } from '@/utils/seoUtils';

// This is a special type of page that generates XML instead of HTML
const SitemapXML: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Set the appropriate content type
  res.setHeader('Content-Type', 'text/xml');
  
  // Generate the sitemap XML
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamecviajes.com';
  const xml = await generateSitemap(baseUrl);
  
  // Send the XML as the response
  res.write(xml);
  res.end();
  
  return {
    props: {},
  };
};

export default SitemapXML;

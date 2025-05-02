
import React from 'react';
import { GetServerSideProps } from 'next';

// This is a special type of page that generates text instead of HTML
const RobotsTXT: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Set the appropriate content type
  res.setHeader('Content-Type', 'text/plain');
  
  // Define the base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamecviajes.com';
  
  // Generate robots.txt content
  const content = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`;
  
  // Send the content as the response
  res.write(content);
  res.end();
  
  return {
    props: {},
  };
};

export default RobotsTXT;

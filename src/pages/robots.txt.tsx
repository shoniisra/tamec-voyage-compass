
import React, { useEffect } from 'react';

// This component would represent the robots.txt content
const RobotsTXT: React.FC = () => {
  useEffect(() => {
    // In a traditional SPA setup, we'd serve this via an API endpoint
    const generateRobotsTxt = () => {
      // Define the base URL
      const baseUrl = window.location.origin;
      
      // Generate robots.txt content
      const content = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`;
      
      console.log('Generated robots.txt content:', content);
      
      // In production with a real API endpoint, you would:
      // 1. Set up a server endpoint (e.g., /api/robots.txt)
      // 2. Return the text with Content-Type: text/plain
    };
    
    generateRobotsTxt();
  }, []);
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Robots.txt</h1>
      <p className="mb-4">
        This page would generate a robots.txt file in production environment.
      </p>
      <p>
        For SEO implementation in a single-page application, you would typically:
      </p>
      <ul className="list-disc pl-6 mt-2">
        <li>Set up a server endpoint that serves the robots.txt content</li>
        <li>Configure your web server to serve this file at the root of your domain</li>
      </ul>
    </div>
  );
};

export default RobotsTXT;

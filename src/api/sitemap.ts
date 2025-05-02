
import { generateSitemap } from '@/utils/seoUtils';

// This function would be called by your hosting platform's functions or API routes
export async function handler(req: any, res: any) {
  try {
    // Set the appropriate content type
    res.setHeader('Content-Type', 'text/xml');
    
    // Define the base URL - this should be your production URL
    const baseUrl = process.env.REACT_APP_BASE_URL || 'https://tamecviajes.com';
    
    // Generate the sitemap
    const xml = await generateSitemap(baseUrl);
    
    // Return the XML
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}

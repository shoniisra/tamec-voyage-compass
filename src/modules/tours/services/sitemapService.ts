
import { supabase } from '@/integrations/supabase/client';
import { Tour } from '../types';

/**
 * Fetch all tour slugs for the sitemap
 */
export const fetchAllTourSlugs = async (): Promise<{ slug: string; updated_at?: string }[]> => {
  const { data, error } = await supabase
    .from('tours')
    .select('slug, updated_at')
    .filter('slug', 'not.is', null);
    
  if (error) {
    console.error('Error fetching tour slugs for sitemap:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * Generate XML sitemap content
 */
export const generateToursSitemap = async (baseUrl: string): Promise<string> => {
  try {
    const tours = await fetchAllTourSlugs();
    
    // Start XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add homepage
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}</loc>\n`;
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';
    
    // Add destinations page
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/destinations</loc>\n`;
    xml += '    <priority>0.9</priority>\n';
    xml += '  </url>\n';
    
    // Add each tour
    tours.forEach(tour => {
      if (tour.slug) {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/destinations/${tour.slug}</loc>\n`;
        
        // Add lastmod if available
        if (tour.updated_at) {
          const lastmod = new Date(tour.updated_at).toISOString().split('T')[0];
          xml += `    <lastmod>${lastmod}</lastmod>\n`;
        }
        
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';
      }
    });
    
    // Close XML
    xml += '</urlset>';
    
    return xml;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
};

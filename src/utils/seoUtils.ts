
import { generateToursSitemap } from '@/modules/tours/services/sitemapService';

/**
 * Generate a complete sitemap for the website
 * This combines tour pages and static pages
 */
export const generateSitemap = async (baseUrl: string): Promise<string> => {
  try {
    // Generate the tour sitemap
    const toursSitemap = await generateToursSitemap(baseUrl);
    
    return toursSitemap;
  } catch (error) {
    console.error('Error in generateSitemap:', error);
    throw error;
  }
};

/**
 * Preload tour data helper function
 * @param slug The tour slug to preload
 */
export const preloadTourData = (slug: string): void => {
  if (!slug) return;
  
  // Create a link element for resource hint
  const linkElement = document.createElement('link');
  linkElement.rel = 'preload';
  linkElement.as = 'fetch';
  linkElement.href = `/api/tours/${slug}`;
  linkElement.crossOrigin = 'anonymous';
  
  // Append to document head
  document.head.appendChild(linkElement);
};

/**
 * Preload critical tour images
 * @param imageUrl The image URL to preload
 */
export const preloadTourImage = (imageUrl: string): void => {
  if (!imageUrl) return;
  
  const linkElement = document.createElement('link');
  linkElement.rel = 'preload';
  linkElement.as = 'image';
  linkElement.href = imageUrl;
  
  document.head.appendChild(linkElement);
};

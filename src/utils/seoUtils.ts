
import { generateToursSitemap } from '@/modules/tours/services/sitemapService';

/**
 * Generate a sitemap for the entire site
 */
export const generateSitemap = async (baseUrl: string): Promise<string> => {
  // For now we're only including tours in our sitemap
  // This can be expanded to include other dynamic content
  return generateToursSitemap(baseUrl);
};

/**
 * Format a string for use in URLs (slug)
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics/accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Trim hyphens from start
    .replace(/-+$/, ''); // Trim hyphens from end
};

/**
 * Create a canonical URL for a page
 */
export const getCanonicalUrl = (path: string, baseUrl?: string): string => {
  const base = baseUrl || window.location.origin;
  // Ensure path starts with a slash and remove any trailing slash
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${formattedPath}`.replace(/\/$/, '');
};

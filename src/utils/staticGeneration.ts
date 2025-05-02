
import { Tour } from '@/modules/tours/types';
import { supabase } from '@/integrations/supabase/client';
import { prefetchTour } from '@/modules/tours/hooks/use-tour';

/**
 * Prefetch and cache services pages data
 * This function would be called during app initialization
 */
export const prefetchStaticPages = async (): Promise<void> => {
  try {
    console.log('Prefetching static pages data...');
    
    // Prefetch about us page content (if it comes from database)
    try {
      const { data: aboutUsData } = await supabase
        .from('static_pages')
        .select('*')
        .eq('slug', 'about-us')
        .single();
        
      if (aboutUsData) {
        // Store in local storage or another cache mechanism
        localStorage.setItem('static_page_about_us', JSON.stringify(aboutUsData));
        console.log('About us page data prefetched');
      }
    } catch (error) {
      console.warn('About us page prefetch failed, might not exist in database');
    }
    
    // Prefetch services page data
    const services = ['visa-processing', 'flights', 'galapagos'];
    
    for (const service of services) {
      try {
        const { data: serviceData } = await supabase
          .from('static_pages')
          .select('*')
          .eq('slug', `services-${service}`)
          .single();
          
        if (serviceData) {
          localStorage.setItem(`static_page_${service}`, JSON.stringify(serviceData));
          console.log(`Service page ${service} data prefetched`);
        }
      } catch (error) {
        console.warn(`Service ${service} page prefetch failed, might not exist in database`);
      }
    }
    
    // Prefetch popular tours for homepage
    try {
      const { data: popularTours } = await supabase
        .from('tours')
        .select('slug')
        .order('id', { ascending: false })
        .limit(5);
        
      if (popularTours && popularTours.length > 0) {
        // Prefetch each tour data
        for (const tourData of popularTours) {
          if (tourData.slug) {
            const tourDetails = await prefetchTour(tourData.slug);
            if (tourDetails) {
              console.log(`Prefetched tour data for ${tourData.slug}`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error prefetching popular tours:', error);
    }
  } catch (error) {
    console.error('Error in prefetchStaticPages:', error);
  }
};

/**
 * Get static page content with language support
 * @param slug The page slug to retrieve
 * @param language The language code (en/es)
 */
export const getStaticPageContent = (slug: string, language: string): any => {
  try {
    const cachedData = localStorage.getItem(`static_page_${slug}`);
    
    if (cachedData) {
      const data = JSON.parse(cachedData);
      
      // Return data for the specific language
      return {
        title: language === 'en' ? data.title_en || data.title : data.title,
        content: language === 'en' ? data.content_en || data.content : data.content,
        meta_description: language === 'en' ? data.meta_description_en || data.meta_description : data.meta_description,
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting static page content for ${slug}:`, error);
    return null;
  }
};

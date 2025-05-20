
import { supabase } from '@/integrations/supabase/client';
import { Tour, TourDestino } from '@/modules/tours/types';

// Preload tour data for static generation
export const preloadTourData = async (slug: string): Promise<Tour | null> => {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select(`
        *,
        aerolinea:aerolinea_id(*),
        destinos:tour_destinos(
          id,
          orden,
          destino:destino_id(*)
        ),
        fotos(*),
        salidas(*),
        precios(*),
        regalos:tour_regalos(
          regalo:regalo_id(*)
        ),
        actividades(*),
        adjuntos(*)
      `)
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error preloading tour data:', error);
      return null;
    }
    
    // Process and transform the data to match the Tour type
    if (data) {
      // Format destinos to match TourDestino type
      const destinos: TourDestino[] = data.destinos?.map((item: any) => ({
        id: item.id,
        tour_id: data.id,
        destino_id: item.destino.id,
        orden: item.orden,
        destino: item.destino
      })) || [];
      
      // Return processed tour data
      return {
        ...data,
        destinos
      } as Tour;
    }
    
    return null;
  } catch (error) {
    console.error('Error preloading tour data:', error);
    return null;
  }
};

// Function to prefetch data for static pages
export const prefetchStaticPages = async (): Promise<void> => {
  try {
    console.log('Prefetching static pages data...');
    
    // Prefetch featured tours for homepage
    const { data: featuredTours, error: featuredError } = await supabase
      .from('tours')
      .select('slug')
      .limit(5);
      
    if (featuredError) {
      console.error('Error prefetching featured tours:', featuredError);
      return;
    }
    
    // Prefetch tour data for each featured tour
    if (featuredTours && featuredTours.length > 0) {
      console.log(`Prefetching ${featuredTours.length} featured tours...`);
      
      await Promise.all(
        featuredTours.map(tour => preloadTourData(tour.slug))
      );
    }
    
    console.log('Static pages data prefetched successfully');
  } catch (error) {
    console.error('Error prefetching static pages:', error);
  }
};

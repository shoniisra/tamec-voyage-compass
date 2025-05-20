
import { supabase } from '@/integrations/supabase/client';
import { Tour } from '@/modules/tours/types';

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
    
    return data as Tour;
  } catch (error) {
    console.error('Error preloading tour data:', error);
    return null;
  }
};

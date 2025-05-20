
import { supabase } from '@/integrations/supabase/client';
import { Tour, TourDestino } from '@/modules/tours/types';

/**
 * Prefetches static pages for specific routes to be used with static generation
 */
export const prefetchStaticPages = async () => {
  console.log('Prefetching static pages...');
  try {
    // Example: Prefetch tours for static tour pages
    const { data: tours } = await supabase
      .from('tours')
      .select('*')
      .eq('active', true);

    if (tours) {
      console.log(`Prefetched ${tours.length} tours`);
      // Return data that could be used for static generation
      return { 
        tours,
        paths: tours.map(tour => `/tours/${tour.slug}`)
      };
    }
  } catch (error) {
    console.error('Error prefetching static pages:', error);
  }

  return { tours: [], paths: [] };
};

/**
 * Fetches a tour by slug
 */
export const getTourBySlug = async (slug: string): Promise<Tour | null> => {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select(`
        *,
        aerolinea:aerolinea_id(*),
        tour_destinos(
          id,
          destino_id,
          orden,
          destino:destino_id(*)
        ),
        salidas(
          id,
          fecha_salida,
          dias_duracion,
          cupos_disponibles
        ),
        fotos(id, url_imagen, descripcion, orden),
        precios(
          id,
          ciudad_salida,
          tipo_habitacion,
          forma_pago,
          precio
        ),
        actividades(*),
        adjuntos(*)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error getting tour by slug:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Process and transform the data
    const transformedTour: Partial<Tour> = {
      ...data,
      destinos: data.tour_destinos?.map((td: any) => ({
        id: td.id,
        tour_id: data.id,
        destino_id: td.destino_id,
        orden: td.orden || 0,
        destino: td.destino
      })) || []
    };

    return transformedTour as Tour;
  } catch (error) {
    console.error('Error in getTourBySlug:', error);
    return null;
  }
};


import { Tour } from '@/modules/tours/types/tour';
import { supabase } from '@/integrations/supabase/client';

export async function prefetchStaticPages() {
  try {
    // Fetch all tours for static site generation
    const { data: tours, error } = await supabase
      .from('tours')
      .select(`
        *,
        destinos:tour_destinos(
          id,
          tour_id,
          destino_id,
          orden,
          destino:destinos(*)
        ),
        fotos(*),
        salidas(*),
        adjuntos(*)
      `);
    
    if (error) {
      console.error('Error fetching tours for static generation:', error);
      return [];
    }
    
    // Return processed tours
    return tours.map(processTourData);
  } catch (err) {
    console.error('Failed to prefetch static pages:', err);
    return [];
  }
}

// Helper function to process tour data
function processTourData(tour: any): Tour {
  // Process salidas to match the Salida interface
  const salidas = Array.isArray(tour.salidas) ? tour.salidas.map((salida: any) => ({
    id: salida.id,
    tour_id: salida.tour_id,
    fecha_salida: salida.fecha_salida,
    dias_duracion: salida.dias_duracion,
    cupos_disponibles: salida.cupos_disponibles
  })) : [];
  
  // Process destinos
  const destinos = Array.isArray(tour.destinos) ? tour.destinos : [];
  
  return {
    ...tour,
    salidas,
    destinos
  } as Tour;
}

export async function generateStaticParams() {
  const tours = await prefetchStaticPages();
  return tours.map((tour) => ({
    slug: tour.slug || `tour-${tour.id}`
  }));
}

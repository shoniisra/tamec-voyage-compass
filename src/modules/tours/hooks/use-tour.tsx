
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, TourDestino } from '@/modules/tours/types';
import { useToast } from '@/components/ui/use-toast';
import { preloadTourImage } from '@/utils/seoUtils';

export function useTour(slug: string) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    async function fetchTour() {
      try {
        setLoading(true);
        setError(null);
        
        const { data: tourData, error: tourError } = await supabase
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
            adjuntos(*),
            componentes:componentes_incluidos!componentes_incluidos_tour_id_fkey(*)
          `)
          .eq('slug', slug)
          .single();
          
        if (tourError) throw tourError;
        
        // Calculate lowest price from all prices directly related to tour
        let precio_desde;
        if (tourData.precios && Array.isArray(tourData.precios)) {
          const lowestPrice = tourData.precios.reduce((min, precio) => 
            precio.precio < min ? precio.precio : min
          , Infinity);
          
          precio_desde = lowestPrice !== Infinity ? lowestPrice : undefined;
        }

        // Format gifts array
        const regalos = tourData.regalos?.map((item: any) => item.regalo).filter(Boolean) || [];
        
        // Format destinos to match TourDestino type
        const destinos: TourDestino[] = tourData.destinos?.map((item: any) => ({
          id: item.id,
          tour_id: tourData.id,
          destino_id: item.destino.id,
          orden: item.orden,
          destino: item.destino
        })) || [];
        
        // Map tour data to Tour type
        const mapTourData = (rawTourData: any): Tour => {
          const precios = rawTourData.precios?.map((precio: any) => ({
            id: precio.id,
            tour_id: precio.tour_id,
            ciudad_salida: precio.ciudad_salida,
            tipo_habitacion: (precio.tipo_habitacion as "doble" | "triple" | "individual" | "child"),
            forma_pago: (precio.forma_pago as "efectivo" | "tarjeta"),
            precio: precio.precio
          })) || [];

          return {
            ...rawTourData,
            destinos,
            precio_desde,
            regalos,
            precios
          } as Tour;
        };

        const finalTour = mapTourData(tourData);
        
        setTour(finalTour);
        
        // Preload related tour images for better performance
        if (finalTour.fotos && finalTour.fotos.length > 0) {
          // Preload the first image (hero image)
          preloadTourImage(finalTour.fotos[0].url_imagen);
          
          // Preload up to 3 more gallery images with lower priority
          finalTour.fotos.slice(1, 4).forEach(foto => {
            if (foto.url_imagen) {
              setTimeout(() => preloadTourImage(foto.url_imagen), 1000);
            }
          });
        }
        
      } catch (error) {
        console.error('Error fetching tour:', error);
        setError('Error loading tour data');
        toast({
          variant: "destructive",
          title: "Error loading tour",
          description: "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchTour();
    }
  }, [slug, toast]);
  
  return { tour, loading, error };
}

// Helper function to prefetch tour data (can be used by other components)
export const prefetchTour = async (slug: string): Promise<Tour | null> => {
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
        adjuntos(*),
        componentes:componentes_incluidos!componentes_incluidos_tour_id_fkey(*)
      `)
      .eq('slug', slug)
      .single();
      
    if (error) throw error;
    return data as Tour;
  } catch (error) {
    console.error('Error prefetching tour:', error);
    return null;
  }
};

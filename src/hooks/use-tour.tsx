
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, TourDestino } from '@/types/tour';
import { useToast } from '@/components/ui/use-toast';

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
        
        // Set final tour object with all relations
        const finalTour: Tour = {
          ...tourData,
          destinos,
          precio_desde,
          regalos
        };
        
        setTour(finalTour);
        
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

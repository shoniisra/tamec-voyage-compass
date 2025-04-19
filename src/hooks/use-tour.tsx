
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour } from '@/types/tour';
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
            salidas(
              id,
              fecha_salida,
              dias_duracion,
              cupos_disponibles,
              precios(*)
            ),
            regalos:tour_regalos(
              regalo:regalo_id(*)
            ),
            incluye:tour_incluye(
              incluye:incluye_id(*)
            ),
            actividades(*),
            adjuntos(*),
            componentes:componentes_incluidos!componentes_incluidos_tour_id_fkey(*)
          `)
          .eq('slug', slug)
          .single();
          
        if (tourError) throw tourError;
        
        // Calculate lowest price from all departures
        const precio_desde = tourData.salidas?.reduce((lowest, salida) => {
          const salidaLowestPrice = salida.precios?.reduce((min, precio) => 
            precio.precio < min ? precio.precio : min
          , Infinity) || Infinity;
          return salidaLowestPrice < lowest ? salidaLowestPrice : lowest;
        }, Infinity) || undefined;

        // Format gifts array
        const regalos = tourData.regalos?.map(item => item.regalo).filter(Boolean) || undefined;
        
        // Format includes array
        const incluye = tourData.incluye?.map(item => item.incluye).filter(Boolean) || undefined;
        
        // Set final tour object with all relations
        setTour({
          ...tourData,
          precio_desde,
          regalos,
          incluye
        });
        
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

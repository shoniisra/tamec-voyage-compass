
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour } from '../types/tour';
import { useToast } from '@/components/ui/use-toast';

export const useTour = (slug: string) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchTour = async () => {
      if (!slug) {
        setTour(null);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Try to find by slug first
        let query = supabase
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
            adjuntos(*),
            precios(*),
            actividades(*),
            aerolinea:aerolineas(*)
          `)
          .eq('slug', slug)
          .single();
        
        let { data, error: slugError } = await query;
        
        // If not found by slug, try by ID
        if (slugError && !isNaN(parseInt(slug))) {
          const tourId = parseInt(slug);
          const { data: idData, error: idError } = await supabase
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
              adjuntos(*),
              precios(*),
              actividades(*),
              aerolinea:aerolineas(*)
            `)
            .eq('id', tourId)
            .single();
          
          if (idError) {
            throw idError;
          }
          
          data = idData;
        } else if (slugError) {
          throw slugError;
        }
        
        if (data) {
          setTour(data as unknown as Tour);
        }
      } catch (err: any) {
        console.error('Error fetching tour:', err);
        setError('Failed to fetch tour details');
        toast({
          variant: "destructive",
          title: "Error loading tour",
          description: err.message || "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTour();
  }, [slug, toast]);
  
  return { tour, loading, error };
};

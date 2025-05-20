
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, TourFilterParams } from '../types/tour';
import { useToast } from '@/components/ui/use-toast';

export const useTours = (filterParams: TourFilterParams = {}) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);
      
      try {
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
            adjuntos(*)
          `);
        
        // Apply search filter if present
        if (filterParams.search) {
          query = query.ilike('titulo', `%${filterParams.search}%`);
        }
        
        // Apply destination filter if present
        if (filterParams.destino && filterParams.destino.length > 0) {
          // Get tours that have this destination
          const destinoId = filterParams.destino[0];
          if (destinoId !== 'all') {
            // Convert to number if it's a numeric string
            const destinoIdNum = parseInt(destinoId, 10);
            if (!isNaN(destinoIdNum)) {
              // Use .contains() for the JSON array of destinos
              query = query.eq('tour_destinos.destino_id', destinoIdNum.toString());
            }
          }
        }
        
        // Apply duration filter if present
        if (filterParams.duracion && filterParams.duracion.length > 0) {
          const duracionValue = filterParams.duracion[0];
          // Convert to number if it's a numeric string
          const duracionNum = parseInt(duracionValue, 10);
          if (!isNaN(duracionNum)) {
            query = query.eq('dias_duracion', duracionNum.toString());
          }
        }
        
        // Apply incluye_vuelo filter if present
        if (filterParams.incluye_vuelo !== undefined) {
          query = query.eq('incluye_vuelo', filterParams.incluye_vuelo === true);
        }
        
        // Apply price filter (when implemented)
        // This would require a more complex query or client-side filtering
        
        const { data, error: supabaseError } = await query;
        
        if (supabaseError) {
          throw supabaseError;
        }
        
        if (data) {
          setTours(data as unknown as Tour[]);
        }
      } catch (err: any) {
        console.error('Error fetching tours:', err);
        setError('Failed to fetch tours');
        toast({
          variant: "destructive",
          title: "Error loading tours",
          description: err.message || "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTours();
  }, [filterParams, toast]);
  
  return { tours, loading, error };
};

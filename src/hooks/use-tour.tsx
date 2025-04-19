
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, Salida, ComponentesIncluidos, Regalo, Incluye, TerminosCondiciones } from '@/types/tour';
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
        
        // Fetch tour by slug with basic relations
        const { data: tourData, error: tourError } = await supabase
          .from('tours')
          .select(`
            *,
            aerolinea:aerolinea_id(*),
            terminos:terminos_condiciones_id(*)
          `)
          .eq('slug', slug)
          .single();
          
        if (tourError) throw tourError;
        
        // Fetch destinations for this tour
        const { data: destinosData, error: destinosError } = await supabase
          .from('tour_destinos')
          .select(`
            id,
            tour_id,
            destino_id,
            orden,
            destino:destino_id(*)
          `)
          .eq('tour_id', tourData.id)
          .order('orden', { ascending: true });
          
        if (destinosError) throw destinosError;
        
        // Fetch images for this tour
        const { data: fotosData, error: fotosError } = await supabase
          .from('fotos')
          .select('*')
          .eq('tour_id', tourData.id)
          .order('orden', { ascending: true });
          
        if (fotosError) throw fotosError;
        
        // Fetch departures and prices for this tour
        const { data: salidasData, error: salidasError } = await supabase
          .from('salidas')
          .select(`
            id,
            tour_id,
            fecha_salida,
            dias_duracion,
            cupos_disponibles
          `)
          .eq('tour_id', tourData.id)
          .order('fecha_salida', { ascending: true });
          
        if (salidasError) throw salidasError;

        // Fetch prices for this tour
        const { data: preciosData, error: preciosError } = await supabase
          .from('precios')
          .select('*')
          .eq('tour_id', tourData.id);

        if (preciosError) throw preciosError;

        // Fetch included components
        const { data: componentesData, error: componentesError } = await supabase
          .from('componentes_incluidos')
          .select('*')
          .eq('tour_id', tourData.id)
          .single();

        if (componentesError && componentesError.code !== 'PGRST116') throw componentesError;

        // Fetch gifts for this tour
        const { data: regalosData, error: regalosError } = await supabase
          .from('tour_regalos')
          .select(`
            id,
            tour_id,
            regalo:regalo_id(*)
          `)
          .eq('tour_id', tourData.id);

        if (regalosError) throw regalosError;

        // Fetch included items for this tour
        const { data: incluyeData, error: incluyeError } = await supabase
          .from('tour_incluye')
          .select(`
            id,
            tour_id,
            incluye:incluye_id(*)
          `)
          .eq('tour_id', tourData.id);

        if (incluyeError) throw incluyeError;
        
        // Map salidas with their corresponding prices
        const formattedSalidas = salidasData.map(salida => {
          const salidaPrecios = preciosData.filter(precio => precio.tour_id === tourData.id);
          
          return {
            ...salida,
            precios: salidaPrecios.map(precio => ({
              ...precio,
              tipo_habitacion: precio.tipo_habitacion as 'doble' | 'triple' | 'individual' | 'child',
              forma_pago: precio.forma_pago as 'efectivo' | 'tarjeta'
            }))
          };
        });

        // Format gifts and included items
        const regalos = regalosData?.map(item => item.regalo) || [];
        const incluye = incluyeData?.map(item => item.incluye) || [];
        
        // Format componentes_incluidos
        const componentes = componentesData ? {
          ...componentesData,
          incluye_maleta_10kg: componentesData.incluye_maleta_10 || false
        } : null;
        
        // Set final tour object
        setTour({
          ...tourData,
          destinos: destinosData,
          fotos: fotosData,
          salidas: formattedSalidas as Salida[],
          regalos,
          incluye,
          componentes: componentes as ComponentesIncluidos
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

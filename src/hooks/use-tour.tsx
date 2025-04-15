
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, Salida } from '@/types/tour';
import { useToast } from '@/components/ui/use-toast';

export function useTour(slug: string) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    async function fetchTour() {
      try {
        setLoading(true);
        
        // Fetch tour by slug
        const { data: tourData, error: tourError } = await supabase
          .from('tours')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (tourError) throw tourError;
        
        // Fetch destinations for this tour
        const { data: destinosData, error: destinosError } = await supabase
          .from('tour_destinos')
          .select(`
            id, 
            orden,
            destinos:destino_id(id, pais, ciudad)
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
            fecha_salida,
            dias_duracion,
            cupos_disponibles,
            precios:precios(id, tipo_habitacion, forma_pago, precio)
          `)
          .eq('tour_id', tourData.id)
          .order('fecha_salida', { ascending: true });
          
        if (salidasError) throw salidasError;
        
        // Convert salidas to conform to the Salida type
        const formattedSalidas: Salida[] = salidasData.map(salida => ({
          id: salida.id,
          tour_id: tourData.id,
          fecha_salida: salida.fecha_salida,
          dias_duracion: salida.dias_duracion,
          cupos_disponibles: salida.cupos_disponibles,
          precios: salida.precios || []
        }));
        
        // Format destinations
        const destinos = destinosData.map(item => item.destinos);
        
        // Set final tour object
        setTour({
          id: tourData.id,
          titulo: tourData.titulo,
          descripcion: tourData.descripcion,
          dias_duracion: tourData.dias_duracion,
          fecha_publicacion: tourData.fecha_publicacion,
          fecha_caducidad: tourData.fecha_caducidad,
          terminos_condiciones: tourData.terminos_condiciones,
          politicas_cancelacion: tourData.politicas_cancelacion,
          incluye_boleto_aereo: tourData.incluye_boleto_aereo,
          pdf_detalles_url: tourData.pdf_detalles_url,
          coortesias: tourData.coortesias,
          slug: tourData.slug,
          destinos: destinos,
          fotos: fotosData || [],
          salidas: formattedSalidas
        });
        
      } catch (error) {
        console.error('Error fetching tour:', error);
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
  
  return { tour, loading };
}


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, Actividad, Adjunto } from '@/types/tour';

export const useTour = (slug: string | undefined) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [adjuntos, setAdjuntos] = useState<Adjunto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchTour = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch tour details
        const { data: tourData, error: tourError } = await supabase
          .from('tours')
          .select(`
            *,
            tour_destinos(
              id,
              orden,
              destinos(id, pais, ciudad)
            ),
            salidas(
              id,
              fecha_salida,
              dias_duracion, 
              cupos_disponibles,
              precios(id, tipo_habitacion, forma_pago, precio)
            ),
            fotos(id, url_imagen, descripcion, orden)
          `)
          .eq('slug', slug)
          .single();

        if (tourError) throw tourError;

        // Fetch activities
        const { data: actividadesData, error: actividadesError } = await supabase
          .from('actividades')
          .select('*')
          .eq('tour_id', tourData.id);

        if (actividadesError) throw actividadesError;

        // Fetch attachments
        const { data: adjuntosData, error: adjuntosError } = await supabase
          .from('adjuntos')
          .select('*')
          .eq('tour_id', tourData.id);

        if (adjuntosError) throw adjuntosError;

        // Process and transform the data
        const transformedTour: Tour = {
          ...tourData,
          destinos: tourData.tour_destinos?.map((td: any) => ({
            ...td,
            destino: td.destinos
          })) || []
        };

        setTour(transformedTour);
        setActividades(actividadesData || []);
        setAdjuntos(adjuntosData || []);
      } catch (err) {
        console.error('Error fetching tour:', err);
        setError('Failed to fetch tour details');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

  return { tour, actividades, adjuntos, loading, error };
};

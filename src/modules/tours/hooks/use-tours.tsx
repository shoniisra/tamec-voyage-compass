
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, TourFilterParams, TourDestino } from '@/modules/tours/types';

export const useTours = (filters?: TourFilterParams) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
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
            )
          `)
          .order('id', { ascending: false });

        // Apply filters if provided
        if (filters) {
          // Text search (on title or description)
          if (filters.search) {
            query = query.or(`titulo.ilike.%${filters.search}%,descripcion.ilike.%${filters.search}%`);
          }
          
          // Filter by active status
          if (filters.active !== undefined) {
            query = query.eq('active', filters.active === 'true');
          }
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          // Process and transform the data
          const transformedTours: Tour[] = data.map((tour: any) => {
            // Calculate the minimum price across all prices
            let precioDesde = Infinity;
            
            if (tour.precios && tour.precios.length > 0) {
              tour.precios.forEach((precio: any) => {
                if (precio.precio < precioDesde) {
                  precioDesde = precio.precio;
                }
              });
            }
            
            // Transform the destinos
            const destinos = tour.tour_destinos?.map((td: any) => ({
              id: td.id,
              tour_id: tour.id,
              destino_id: td.destino_id,
              orden: td.orden || 0,
              destino: td.destino
            })) || [];
            
            return {
              ...tour,
              destinos,
              precio_desde: precioDesde !== Infinity ? precioDesde : undefined
            } as Tour;
          });

          // Apply client-side filtering for destination if needed
          let filteredTours = transformedTours;
          
          if (filters && filters.destino && filters.destino.length > 0) {
            // Use simple array filtering instead of complex type instantiation
            filteredTours = filteredTours.filter(tour => {
              if (!tour.destinos) return false;
              
              const destinoIds = filters.destino || [];
              return tour.destinos.some(td => {
                const id = td.destino_id;
                return id !== undefined && destinoIds.includes(id);
              });
            });
          }

          setTours(filteredTours);
        }
      } catch (err) {
        console.error('Error fetching tours:', err);
        setError('Failed to fetch tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [filters]);

  return { tours, loading, error };
};

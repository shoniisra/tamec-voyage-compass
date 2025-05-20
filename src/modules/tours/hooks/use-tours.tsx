
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, TourFilterParams } from '@/modules/tours/types';

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

          // Filter by includes flight
          if (filters.incluye_vuelo === true) {
            query = query.eq('incluye_vuelo', true);
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

          // Apply client-side filtering
          let filteredTours = transformedTours;
          
          // Filter by destination
          if (filters && filters.destino && filters.destino.length > 0) {
            filteredTours = filteredTours.filter(tour => {
              if (!tour.destinos) return false;
              
              const destinoIds = filters.destino || [];
              return tour.destinos.some(td => {
                const id = td.destino_id;
                return id !== undefined && destinoIds.includes(id);
              });
            });
          }

          // Filter by duration
          if (filters && filters.duracion && filters.duracion.length > 0) {
            filteredTours = filteredTours.filter(tour => {
              return filters.duracion?.includes(tour.dias_duracion || 0);
            });
          }

          // Filter by price range
          if (filters && filters.precio_min !== undefined && filters.precio_max !== undefined) {
            filteredTours = filteredTours.filter(tour => {
              const precio = tour.precio_desde;
              if (!precio) return false;
              return precio >= (filters.precio_min || 0) && precio <= (filters.precio_max || Infinity);
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

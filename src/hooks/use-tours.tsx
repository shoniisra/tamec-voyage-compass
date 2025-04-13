
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tour, TourFilterParams } from '@/types/tour';

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
          .order('id', { ascending: false });

        // Apply filters if provided
        if (filters) {
          // Filter by duration
          if (filters.duracion && filters.duracion.length > 0) {
            query = query.in('dias_duracion', filters.duracion);
          }
          
          // Filter by flight inclusion
          if (filters.incluye_vuelo !== undefined) {
            query = query.eq('incluye_boleto_aereo', filters.incluye_vuelo);
          }
          
          // Filter by maximum price will be done on the client side after fetching
          
          // Filter by destination will be done through a nested query later
          
          // Date filtering will be done on the client side after fetching
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          // Process and transform the data
          const transformedTours: Tour[] = data.map((tour: any) => {
            // Calculate the minimum price across all salidas and precios
            let precioDesde = Infinity;
            
            if (tour.salidas && tour.salidas.length > 0) {
              tour.salidas.forEach((salida: any) => {
                if (salida.precios && salida.precios.length > 0) {
                  salida.precios.forEach((precio: any) => {
                    if (precio.precio < precioDesde) {
                      precioDesde = precio.precio;
                    }
                  });
                }
              });
            }
            
            return {
              ...tour,
              destinos: tour.tour_destinos?.map((td: any) => ({
                ...td,
                destino: td.destinos 
              })) || [],
              precio_desde: precioDesde !== Infinity ? precioDesde : null
            };
          });

          // Apply client-side filtering
          let filteredTours = transformedTours;
          
          if (filters) {
            // Filter by destination if specified
            if (filters.destino && filters.destino.length > 0) {
              filteredTours = filteredTours.filter(tour => {
                return tour.destinos?.some(td => 
                  filters.destino?.includes(td.destino_id || 0)
                );
              });
            }
            
            // Filter by max price if specified
            if (filters.precio_maximo) {
              filteredTours = filteredTours.filter(tour => 
                tour.precio_desde ? tour.precio_desde <= filters.precio_maximo! : false
              );
            }
            
            // Filter by date range if specified
            if (filters.fecha_inicio || filters.fecha_fin) {
              filteredTours = filteredTours.filter(tour => {
                return tour.salidas?.some(salida => {
                  if (!salida.fecha_salida) return false;
                  
                  const salidaDate = new Date(salida.fecha_salida);
                  
                  if (filters.fecha_inicio && salidaDate < filters.fecha_inicio) {
                    return false;
                  }
                  
                  if (filters.fecha_fin && salidaDate > filters.fecha_fin) {
                    return false;
                  }
                  
                  return true;
                });
              });
            }
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

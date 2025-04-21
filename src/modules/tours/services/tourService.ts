
import { supabase } from '@/integrations/supabase/client';
import { Tour, Destino } from '../types';

/**
 * Fetch a single tour by slug
 */
export const fetchTourBySlug = async (slug: string) => {
  const { data, error } = await supabase
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
    
  if (error) throw error;
  
  return data;
};

/**
 * Fetch all tours with optional filters
 */
export const fetchTours = async (filters?: any) => {
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
      ),
      componentes_incluidos(*)
    `)
    .order('id', { ascending: false });

  // Apply server-side filters if provided
  if (filters) {
    // Duration filter
    if (filters.duracion && filters.duracion.length > 0) {
      query = query.in('dias_duracion', filters.duracion);
    }
    
    // Flight inclusion filter
    if (filters.incluye_vuelo !== undefined) {
      query = query.eq('incluye_boleto_aereo', filters.incluye_vuelo);
    }
  }

  const { data, error } = await query;
  
  if (error) throw error;
  
  return data;
};

/**
 * Fetch all destinations
 */
export const fetchDestinos = async () => {
  const { data, error } = await supabase
    .from('destinos')
    .select('*')
    .order('pais', { ascending: true });
  
  if (error) throw error;
  
  return data;
};


import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export function useTourManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Create a new tour
  const createTour = async (
    tourData: any,
    destinos: Array<{ destino_id: number; orden: number }>,
    salidas: Array<{ fecha_salida: string | null; dias_duracion: number; cupos_disponibles: number | null }>,
    precios: Array<{
      ciudad_salida: string;
      tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
      forma_pago: 'efectivo' | 'tarjeta';
      precio: number;
    }>,
    componentes: {
      incluye_vuelo: boolean;
      incluye_hotel: boolean;
      incluye_transporte: boolean;
      incluye_comida: boolean;
      incluye_actividades: boolean;
      incluye_maleta_10: boolean;
      incluye_maleta_23: boolean;
      incluye_articulo_personal: boolean;
    },
    regalos: Array<{ regalo_id: number }>
  ) => {
    try {
      setIsLoading(true);
      
      // Insert new tour
      const { data: tourResult, error: tourError } = await supabase
        .from('tours')
        .insert([
          {
            titulo: tourData.titulo,
            descripcion: tourData.descripcion,
            dias_duracion: tourData.dias_duracion,
            pdf_detalles_url: tourData.pdf_detalles_url,
            fecha_publicacion: tourData.fecha_publicacion,
            fecha_caducidad: tourData.fecha_caducidad,
            coortesias: tourData.coortesias,
            terminos_condiciones: tourData.terminos_condiciones,
            politicas_cancelacion: tourData.politicas_cancelacion,
            slug: tourData.slug,
            aerolinea_id: tourData.aerolinea_id,
            terminos_condiciones_id: tourData.terminos_condiciones_id,
            incluye_vuelo: tourData.incluye_vuelo || false,
            incluye_transporte: tourData.incluye_transporte || false,
            incluye_hospedaje: tourData.incluye_hospedaje || false,
            incluye_comida: tourData.incluye_comida || false,
            incluye_actividades: tourData.incluye_actividades || false,
          },
        ])
        .select()
        .single();
      
      if (tourError) throw tourError;
      
      const tourId = tourResult.id;
      
      // Insert destinations
      if (destinos.length > 0) {
        const destinosData = destinos.map(d => ({
          tour_id: tourId,
          destino_id: d.destino_id,
          orden: d.orden,
        }));
        
        const { error: destinosError } = await supabase
          .from('tour_destinos')
          .insert(destinosData);
        
        if (destinosError) throw destinosError;
      }
      
      // Insert departures
      if (salidas.length > 0) {
        const salidasData = salidas.map(s => ({
          tour_id: tourId,
          fecha_salida: s.fecha_salida,
          dias_duracion: s.dias_duracion,
          cupos_disponibles: s.cupos_disponibles,
        }));
        
        const { error: salidasError } = await supabase
          .from('salidas')
          .insert(salidasData);
        
        if (salidasError) throw salidasError;
      }
      
      // Insert prices
      if (precios.length > 0) {
        const preciosData = precios.map(p => ({
          tour_id: tourId,
          ciudad_salida: p.ciudad_salida,
          tipo_habitacion: p.tipo_habitacion,
          forma_pago: p.forma_pago,
          precio: p.precio,
        }));
        
        const { error: preciosError } = await supabase
          .from('precios')
          .insert(preciosData);
        
        if (preciosError) throw preciosError;
      }
      
      // Insert included components
      const { error: componentesError } = await supabase
        .from('componentes_incluidos')
        .insert([{
          tour_id: tourId,
          incluye_vuelo: componentes.incluye_vuelo,
          incluye_hotel: componentes.incluye_hotel,
          incluye_transporte: componentes.incluye_transporte,
          incluye_comida: componentes.incluye_comida,
          incluye_actividades: componentes.incluye_actividades,
          incluye_maleta_10: componentes.incluye_maleta_10,
          incluye_maleta_23: componentes.incluye_maleta_23,
          incluye_articulo_personal: componentes.incluye_articulo_personal,
        }]);
      
      if (componentesError) throw componentesError;
      
      // Insert gifts
      if (regalos.length > 0) {
        const regalosData = regalos.map(r => ({
          tour_id: tourId,
          regalo_id: r.regalo_id,
        }));
        
        const { error: regalosError } = await supabase
          .from('tour_regalos')
          .insert(regalosData);
        
        if (regalosError) throw regalosError;
      }
      
      return tourId;
    } catch (error: any) {
      console.error('Error creating tour:', error);
      toast({
        variant: "destructive",
        title: "Error creating tour",
        description: error.message || "Please try again later.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update an existing tour
  const updateTour = async (
    tourId: number,
    tourData: any,
    destinos: Array<{ destino_id: number; orden: number }>,
    salidas: Array<{ fecha_salida: string | null; dias_duracion: number; cupos_disponibles: number | null }>,
    precios: Array<{
      ciudad_salida: string;
      tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
      forma_pago: 'efectivo' | 'tarjeta';
      precio: number;
    }>,
    componentes: {
      incluye_vuelo: boolean;
      incluye_hotel: boolean;
      incluye_transporte: boolean;
      incluye_comida: boolean;
      incluye_actividades: boolean;
      incluye_maleta_10: boolean;
      incluye_maleta_23: boolean;
      incluye_articulo_personal: boolean;
    },
    regalos: Array<{ regalo_id: number }>
  ) => {
    try {
      setIsLoading(true);
      
      // Update tour
      const { error: tourError } = await supabase
        .from('tours')
        .update({
          titulo: tourData.titulo,
          descripcion: tourData.descripcion,
          dias_duracion: tourData.dias_duracion,
          pdf_detalles_url: tourData.pdf_detalles_url,
          fecha_publicacion: tourData.fecha_publicacion,
          fecha_caducidad: tourData.fecha_caducidad,
          coortesias: tourData.coortesias,
          terminos_condiciones: tourData.terminos_condiciones,
          politicas_cancelacion: tourData.politicas_cancelacion,
          slug: tourData.slug,
          aerolinea_id: tourData.aerolinea_id,
          terminos_condiciones_id: tourData.terminos_condiciones_id,
          incluye_vuelo: tourData.incluye_vuelo || false,
          incluye_transporte: tourData.incluye_transporte || false,
          incluye_hospedaje: tourData.incluye_hospedaje || false,
          incluye_comida: tourData.incluye_comida || false,
          incluye_actividades: tourData.incluye_actividades || false,
        })
        .eq('id', tourId);
      
      if (tourError) throw tourError;
      
      // Update destinations (delete all and re-insert)
      const { error: deleteDestinosError } = await supabase
        .from('tour_destinos')
        .delete()
        .eq('tour_id', tourId);
      
      if (deleteDestinosError) throw deleteDestinosError;
      
      if (destinos.length > 0) {
        const destinosData = destinos.map(d => ({
          tour_id: tourId,
          destino_id: d.destino_id,
          orden: d.orden,
        }));
        
        const { error: destinosError } = await supabase
          .from('tour_destinos')
          .insert(destinosData);
        
        if (destinosError) throw destinosError;
      }
      
      // Update departures (delete all and re-insert)
      const { error: deleteSalidasError } = await supabase
        .from('salidas')
        .delete()
        .eq('tour_id', tourId);
      
      if (deleteSalidasError) throw deleteSalidasError;
      
      if (salidas.length > 0) {
        const salidasData = salidas.map(s => ({
          tour_id: tourId,
          fecha_salida: s.fecha_salida,
          dias_duracion: s.dias_duracion,
          cupos_disponibles: s.cupos_disponibles,
        }));
        
        const { error: salidasError } = await supabase
          .from('salidas')
          .insert(salidasData);
        
        if (salidasError) throw salidasError;
      }
      
      // Update prices (delete all and re-insert)
      const { error: deletePreciosError } = await supabase
        .from('precios')
        .delete()
        .eq('tour_id', tourId);
      
      if (deletePreciosError) throw deletePreciosError;
      
      if (precios.length > 0) {
        const preciosData = precios.map(p => ({
          tour_id: tourId,
          ciudad_salida: p.ciudad_salida,
          tipo_habitacion: p.tipo_habitacion,
          forma_pago: p.forma_pago,
          precio: p.precio,
        }));
        
        const { error: preciosError } = await supabase
          .from('precios')
          .insert(preciosData);
        
        if (preciosError) throw preciosError;
      }
      
      // Update included components
      const { error: deleteComponentesError } = await supabase
        .from('componentes_incluidos')
        .delete()
        .eq('tour_id', tourId);
      
      if (deleteComponentesError) throw deleteComponentesError;
      
      const { error: componentesError } = await supabase
        .from('componentes_incluidos')
        .insert([{
          tour_id: tourId,
          incluye_vuelo: componentes.incluye_vuelo,
          incluye_hotel: componentes.incluye_hotel,
          incluye_transporte: componentes.incluye_transporte,
          incluye_comida: componentes.incluye_comida,
          incluye_actividades: componentes.incluye_actividades,
          incluye_maleta_10: componentes.incluye_maleta_10,
          incluye_maleta_23: componentes.incluye_maleta_23,
          incluye_articulo_personal: componentes.incluye_articulo_personal,
        }]);
      
      if (componentesError) throw componentesError;
      
      // Update gifts (delete all and re-insert)
      const { error: deleteRegalosError } = await supabase
        .from('tour_regalos')
        .delete()
        .eq('tour_id', tourId);
      
      if (deleteRegalosError) throw deleteRegalosError;
      
      if (regalos.length > 0) {
        const regalosData = regalos.map(r => ({
          tour_id: tourId,
          regalo_id: r.regalo_id,
        }));
        
        const { error: regalosError } = await supabase
          .from('tour_regalos')
          .insert(regalosData);
        
        if (regalosError) throw regalosError;
      }
      
      return tourId;
    } catch (error: any) {
      console.error('Error updating tour:', error);
      toast({
        variant: "destructive",
        title: "Error updating tour",
        description: error.message || "Please try again later.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a tour
  const deleteTour = async (tourId: number) => {
    try {
      setIsLoading(true);
      
      // Delete tour (this will cascade delete all related data due to FK constraints)
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', tourId);
      
      if (error) throw error;
      
      toast({
        title: "Tour Deleted",
        description: "The tour has been deleted successfully.",
      });
      
      navigate('/admin/tours');
    } catch (error: any) {
      console.error('Error deleting tour:', error);
      toast({
        variant: "destructive",
        title: "Error deleting tour",
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTour,
    updateTour,
    deleteTour,
    isLoading,
  };
}

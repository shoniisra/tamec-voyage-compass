
export interface Aerolinea {
  id: number;
  nombre: string;
  codigo?: string;
}

export interface Regalo {
  id: number;
  nombre: string;
}

export interface Incluye {
  id: number;
  nombre: string;
}

export interface TerminosCondiciones {
  id: number;
  titulo: string;
}

export interface Tour {
  id: number;
  titulo: string;
  descripcion?: string;
  dias_duracion?: number;
  incluye_boleto_aereo?: boolean;
  pdf_detalles_url?: string;
  fecha_publicacion?: string;
  fecha_caducidad?: string;
  coortesias?: string;
  terminos_condiciones?: string;
  politicas_cancelacion?: string;
  slug?: string;
  destino_principal?: string;
  active?: boolean;
  aerolinea_id?: number | null;
  terminos_condiciones_id?: number | null;
  destinos?: TourDestino[];
  regalos?: Regalo[];
  incluye?: Incluye[];
  salidas?: Salida[];
  // Direct properties that were previously in 'componentes'
  incluye_vuelo?: boolean;
  incluye_hotel?: boolean;
  incluye_transporte?: boolean;
  incluye_hospedaje?: boolean;
  incluye_comida?: boolean; 
  incluye_actividades?: boolean;
  incluye_maleta_10?: boolean;
  incluye_maleta_23?: boolean;
  incluye_articulo_personal?: boolean;
  // Add missing properties that are used in the code
  fotos?: Foto[];
  precio_desde?: number;
}

export interface Foto {
  id: number;
  tour_id: number;
  url_imagen: string;
  descripcion?: string;
  orden?: number;
}

export interface TourFilterParams {
  search?: string;
  destino_id?: string;
  active?: string;
  // Updated filter parameters
  duracion?: number[];
  destino?: number[];
}

export interface Destino {
  id: number;
  nombre: string;
  descripcion?: string;
  pais: string;
  ciudad?: string;
  active?: boolean;
}

export interface TourDestino {
  id: number;
  tour_id: number;
  destino_id: number;
  orden: number;
  destino?: Destino;
}

export interface Salida {
  id: number;
  tour_id: number;
  fecha_salida: string;
  dias_duracion: number;
  cupos_disponibles: number;
  precios?: Precio[];
}

export interface Precio {
  id: number;
  tour_id: number;
  ciudad_salida: string;
  tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
  forma_pago: 'efectivo' | 'tarjeta';
  precio: number;
}

// Componentes_incluidos interface has been removed as its properties were moved directly to Tour


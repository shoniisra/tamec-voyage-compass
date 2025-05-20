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

export interface Actividad {
  id: number;
  nombre: string;
  descripcion?: string;
  costo_adicional?: number;
  incluida?: boolean;
  tour_id?: number;
}

export interface Adjunto {
  id: number;
  url_archivo: string;
  descripcion?: string;
  tipo_archivo?: string;
  tour_id?: number;
}

export interface Foto {
  id: number;
  tour_id: number;
  url_imagen: string;
  descripcion?: string;
  orden?: number;
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
  fotos?: Foto[];
  actividades?: Actividad[];
  adjuntos?: Adjunto[];
  precios?: Precio[];
  aerolinea?: Aerolinea;
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
  precio_desde?: number;
}

export interface TourFilterParams {
  search?: string;
  destino_id?: string;
  active?: string;
  // Updated filter parameters
  duracion?: number[];
  destino?: number[];
  incluye_vuelo?: boolean;
  precio_min?: number;
  precio_max?: number;
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
  tour_id?: number;
  fecha_salida: string;
  dias_duracion: number;
  cupos_disponibles: number;
}

export interface Precio {
  id: number;
  tour_id: number;
  ciudad_salida: string;
  tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
  forma_pago: 'efectivo' | 'tarjeta';
  precio: number;
}

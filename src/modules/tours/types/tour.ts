
export interface Tour {
  id: number;
  titulo: string;
  descripcion?: string | null;
  dias_duracion?: number | null;
  pdf_detalles_url?: string | null;
  fecha_publicacion?: string | null;
  fecha_caducidad?: string | null;
  coortesias?: string | null;
  terminos_condiciones?: string | null;
  politicas_cancelacion?: string | null;
  slug?: string | null;
  aerolinea_id?: number | null;
  terminos_condiciones_id?: number | null;
  destinos: TourDestino[];
  salidas?: Salida[];
  precios?: Precio[];
  aerolinea?: Aerolinea;
  regalos?: Regalo[];
  componentes?: ComponentesIncluidos;
  precio_desde?: number;
}

export interface TourDestino {
  id: number;
  tour_id: number | null;
  destino_id: number | null;
  orden: number | null;
  destino?: Destino;
}

export interface Destino {
  id: number;
  pais: string;
  ciudad?: string | null;
}

export interface Salida {
  id: number;
  tour_id: number | null;
  fecha_salida: string | null;
  dias_duracion: number;
  cupos_disponibles: number | null;
}

export interface Precio {
  id: number;
  tour_id?: number;
  ciudad_salida: string;
  tipo_habitacion: "doble" | "triple" | "individual" | "child";
  forma_pago: "efectivo" | "tarjeta";
  precio: number;
}

export interface Aerolinea {
  id: number;
  nombre: string;
  logo_url?: string;
  pais_origen?: string;
  codigo?: string;
}

export interface Regalo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface ComponentesIncluidos {
  id: number;
  tour_id: number;
  incluye_vuelo: boolean;
  incluye_hotel: boolean;
  incluye_transporte: boolean;
  incluye_comida: boolean;
  incluye_actividades: boolean;
  incluye_maleta_10: boolean;
  incluye_maleta_23: boolean;
  incluye_articulo_personal: boolean;
}

export interface TourFilterParams {
  duracion?: number[];
  incluye_vuelo?: boolean;
  precio_maximo?: number;
  destino?: number[];
  fecha_inicio?: Date;
  fecha_fin?: Date;
}

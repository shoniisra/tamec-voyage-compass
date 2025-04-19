
export type Tour = {
  id: number;
  titulo: string;
  descripcion: string | null;
  dias_duracion: number | null;
  incluye_boleto_aereo: boolean | null;
  pdf_detalles_url: string | null;
  fecha_publicacion: string | null;
  fecha_caducidad: string | null;
  coortesias: string | null;
  terminos_condiciones: string | null;
  politicas_cancelacion: string | null;
  slug: string | null;
  aerolinea_id: number | null;
  terminos_condiciones_id: number | null;
  destinos?: TourDestino[];
  salidas?: Salida[];
  fotos?: Foto[];
  precio_desde?: number;
  aerolinea?: Aerolinea;
  regalos?: Regalo[];
  incluye?: Incluye[];
  componentes?: ComponentesIncluidos;
};

export type Destino = {
  id: number;
  pais: string;
  ciudad: string | null;
};

export type TourDestino = {
  id: number;
  tour_id: number | null;
  destino_id: number | null;
  orden: number | null;
  destino?: Destino;
};

export type Salida = {
  id: number;
  tour_id: number | null;
  fecha_salida: string | null;
  dias_duracion: number;
  cupos_disponibles: number | null;
  precios?: Precio[];
};

export type Precio = {
  id: number;
  tour_id: number | null;
  ciudad_salida: string;
  tipo_habitacion: 'doble' | 'triple' | 'individual' | 'child';
  forma_pago: 'efectivo' | 'tarjeta';
  precio: number;
};

export type Aerolinea = {
  id: number;
  nombre: string;
  codigo: string | null;
  pais_origen: string | null;
};

export type Regalo = {
  id: number;
  nombre: string;
  descripcion: string | null;
};

export type TourRegalo = {
  id: number;
  tour_id: number | null;
  regalo_id: number | null;
  regalo?: Regalo;
};

export type Incluye = {
  id: number;
  nombre: string;
  descripcion: string | null;
};

export type TourIncluye = {
  id: number;
  tour_id: number | null;
  incluye_id: number | null;
  incluye?: Incluye;
};

export type ComponentesIncluidos = {
  id: number;
  tour_id: number | null;
  incluye_vuelo: boolean;
  incluye_hotel: boolean;
  incluye_transporte: boolean;
  incluye_comida: boolean;
  incluye_actividades: boolean;
  incluye_maleta_10: boolean;
  incluye_maleta_23: boolean;
  incluye_articulo_personal: boolean;
};

export type Foto = {
  id: number;
  tour_id: number | null;
  url_imagen: string;
  descripcion: string | null;
  orden: number | null;
};

export type TerminosCondiciones = {
  id: number;
  titulo: string | null;
  contenido: string;
};

export type TourFilterParams = {
  duracion?: number[];
  destino?: number[];
  precio_maximo?: number;
  incluye_vuelo?: boolean;
  fecha_inicio?: Date | null;
  fecha_fin?: Date | null;
};

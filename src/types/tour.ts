
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
  destinos?: TourDestino[];
  salidas?: Salida[];
  fotos?: Foto[];
  precio_desde?: number;
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
  salida_id: number | null;
  tipo_habitacion: 'doble' | 'triple' | 'individual' | 'niño';
  forma_pago: 'efectivo' | 'tarjeta';
  precio: number;
};

export type Actividad = {
  id: number;
  tour_id: number | null;
  nombre: string;
  descripcion: string | null;
  incluida: boolean | null;
  costo_adicional: number | null;
};

export type Foto = {
  id: number;
  tour_id: number | null;
  url_imagen: string;
  descripcion: string | null;
  orden: number | null;
};

export type Adjunto = {
  id: number;
  tour_id: number | null;
  tipo_archivo: string | null;
  url_archivo: string;
  descripcion: string | null;
};

export type TourFilterParams = {
  duracion?: number[];
  destino?: number[];
  precio_maximo?: number;
  incluye_vuelo?: boolean;
  fecha_inicio?: Date | null;
  fecha_fin?: Date | null;
};

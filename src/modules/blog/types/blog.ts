// Blog related types
export interface BlogPost {
  id: string;
  title: string;
  title_en?: string;
  content_en?: any; // Changed from string to any to match EditorJS JSON structure
  content_es?: string;
  category_en?: string;
  category_es?: string;
  excerpt_en?: string;
  excerpt_es?: string;
  cover_image?: string;
  slug: string;
  date?: string;
  created_at?: string;
  isLegacy?: boolean;
  // New content from EditorJS
  newContent?: any;
  content?: any;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  category_id?: string | null;
}

export interface BlogComment {
  id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}

export type Comment = {
  id: string;
  blog_id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
};

// Types for blog management
export interface EditorJSBlogData {
  title: string;
  title_en?: string;
  content: any;
  content_en?: any;
  slug?: string;
  cover_image?: string;
}

// Price, Salida, and TourDestino types to fix build errors
export interface Precio {
  id: number;
  salida_id: number | null;
  tipo_habitacion: "doble" | "triple" | "individual" | "niño";
  forma_pago: "efectivo" | "tarjeta";
  precio: number;
}

export interface Salida {
  id: number;
  tour_id: number | null;
  fecha_salida: string | null;
  dias_duracion: number;
  cupos_disponibles: number | null;
  precios?: Precio[];
}

export interface TourDestino {
  id: number;
  tour_id: number | null;
  destino_id: number | null;
  orden: number | null;
  pais?: string;
  ciudad?: string;
}

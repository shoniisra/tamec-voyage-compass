export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      actividades: {
        Row: {
          costo_adicional: number | null
          descripcion: string | null
          id: number
          incluida: boolean | null
          nombre: string
          tour_id: number | null
        }
        Insert: {
          costo_adicional?: number | null
          descripcion?: string | null
          id?: number
          incluida?: boolean | null
          nombre: string
          tour_id?: number | null
        }
        Update: {
          costo_adicional?: number | null
          descripcion?: string | null
          id?: number
          incluida?: boolean | null
          nombre?: string
          tour_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "actividades_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      adjuntos: {
        Row: {
          descripcion: string | null
          id: number
          tipo_archivo: string | null
          tour_id: number | null
          url_archivo: string
        }
        Insert: {
          descripcion?: string | null
          id?: number
          tipo_archivo?: string | null
          tour_id?: number | null
          url_archivo: string
        }
        Update: {
          descripcion?: string | null
          id?: number
          tipo_archivo?: string | null
          tour_id?: number | null
          url_archivo?: string
        }
        Relationships: [
          {
            foreignKeyName: "adjuntos_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_comments: {
        Row: {
          blog_id: string | null
          content: string
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          blog_id?: string | null
          content: string
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          blog_id?: string | null
          content?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          blog_id: string
          tag_id: string
        }
        Insert: {
          blog_id: string
          tag_id: string
        }
        Update: {
          blog_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_tags_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          content: Json
          content_en: Json | null
          cover_image: string | null
          created_at: string | null
          id: string
          slug: string
          title: string
          title_en: string | null
          updated_at: string | null
        }
        Insert: {
          content: Json
          content_en?: Json | null
          cover_image?: string | null
          created_at?: string | null
          id?: string
          slug: string
          title: string
          title_en?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json
          content_en?: Json | null
          cover_image?: string | null
          created_at?: string | null
          id?: string
          slug?: string
          title?: string
          title_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      destinos: {
        Row: {
          ciudad: string | null
          id: number
          pais: string
        }
        Insert: {
          ciudad?: string | null
          id?: number
          pais: string
        }
        Update: {
          ciudad?: string | null
          id?: number
          pais?: string
        }
        Relationships: []
      }
      fotos: {
        Row: {
          descripcion: string | null
          id: number
          orden: number | null
          tour_id: number | null
          url_imagen: string
        }
        Insert: {
          descripcion?: string | null
          id?: number
          orden?: number | null
          tour_id?: number | null
          url_imagen: string
        }
        Update: {
          descripcion?: string | null
          id?: number
          orden?: number | null
          tour_id?: number | null
          url_imagen?: string
        }
        Relationships: [
          {
            foreignKeyName: "fotos_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          message: string | null
          name: string
          phone: string | null
          source: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name: string
          phone?: string | null
          source?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string
          phone?: string | null
          source?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      precios: {
        Row: {
          forma_pago: Database["public"]["Enums"]["forma_pago_enum"]
          id: number
          precio: number
          salida_id: number | null
          tipo_habitacion: Database["public"]["Enums"]["tipo_habitacion_enum"]
        }
        Insert: {
          forma_pago: Database["public"]["Enums"]["forma_pago_enum"]
          id?: number
          precio: number
          salida_id?: number | null
          tipo_habitacion: Database["public"]["Enums"]["tipo_habitacion_enum"]
        }
        Update: {
          forma_pago?: Database["public"]["Enums"]["forma_pago_enum"]
          id?: number
          precio?: number
          salida_id?: number | null
          tipo_habitacion?: Database["public"]["Enums"]["tipo_habitacion_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "precios_salida_id_fkey"
            columns: ["salida_id"]
            isOneToOne: false
            referencedRelation: "salidas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      salidas: {
        Row: {
          cupos_disponibles: number | null
          dias_duracion: number
          fecha_salida: string | null
          id: number
          tour_id: number | null
        }
        Insert: {
          cupos_disponibles?: number | null
          dias_duracion: number
          fecha_salida?: string | null
          id?: number
          tour_id?: number | null
        }
        Update: {
          cupos_disponibles?: number | null
          dias_duracion?: number
          fecha_salida?: string | null
          id?: number
          tour_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "salidas_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_categories: {
        Row: {
          description: string | null
          id: string
          name: string
          sort_order: number | null
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          sort_order?: number | null
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          category_id: string | null
          color: string
          id: string
          name: string
        }
        Insert: {
          category_id?: string | null
          color: string
          id?: string
          name: string
        }
        Update: {
          category_id?: string | null
          color?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "tag_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_destinos: {
        Row: {
          destino_id: number | null
          id: number
          orden: number | null
          tour_id: number | null
        }
        Insert: {
          destino_id?: number | null
          id?: number
          orden?: number | null
          tour_id?: number | null
        }
        Update: {
          destino_id?: number | null
          id?: number
          orden?: number | null
          tour_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tour_destinos_destino_id_fkey"
            columns: ["destino_id"]
            isOneToOne: false
            referencedRelation: "destinos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_destinos_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          coortesias: string | null
          descripcion: string | null
          dias_duracion: number | null
          fecha_caducidad: string | null
          fecha_publicacion: string | null
          id: number
          incluye_boleto_aereo: boolean | null
          pdf_detalles_url: string | null
          politicas_cancelacion: string | null
          slug: string | null
          terminos_condiciones: string | null
          titulo: string
        }
        Insert: {
          coortesias?: string | null
          descripcion?: string | null
          dias_duracion?: number | null
          fecha_caducidad?: string | null
          fecha_publicacion?: string | null
          id?: number
          incluye_boleto_aereo?: boolean | null
          pdf_detalles_url?: string | null
          politicas_cancelacion?: string | null
          slug?: string | null
          terminos_condiciones?: string | null
          titulo: string
        }
        Update: {
          coortesias?: string | null
          descripcion?: string | null
          dias_duracion?: number | null
          fecha_caducidad?: string | null
          fecha_publicacion?: string | null
          id?: number
          incluye_boleto_aereo?: boolean | null
          pdf_detalles_url?: string | null
          politicas_cancelacion?: string | null
          slug?: string | null
          terminos_condiciones?: string | null
          titulo?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          requested_user_id: string
          requested_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      forma_pago_enum: "efectivo" | "tarjeta"
      tipo_habitacion_enum: "doble" | "triple" | "individual" | "niño"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      forma_pago_enum: ["efectivo", "tarjeta"],
      tipo_habitacion_enum: ["doble", "triple", "individual", "niño"],
    },
  },
} as const

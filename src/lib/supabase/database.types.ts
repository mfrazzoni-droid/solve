export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      calificaciones: {
        Row: {
          cliente_id: string
          comentario: string | null
          created_at: string
          id: string
          puntaje: number
          tecnico_id: string
          trabajo_id: string
        }
        Insert: {
          cliente_id: string
          comentario?: string | null
          created_at?: string
          id?: string
          puntaje: number
          tecnico_id: string
          trabajo_id: string
        }
        Update: {
          cliente_id?: string
          comentario?: string | null
          created_at?: string
          id?: string
          puntaje?: number
          tecnico_id?: string
          trabajo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calificaciones_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calificaciones_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calificaciones_trabajo_id_fkey"
            columns: ["trabajo_id"]
            isOneToOne: false
            referencedRelation: "trabajos"
            referencedColumns: ["id"]
          },
        ]
      }
      comisiones: {
        Row: {
          created_at: string
          id: string
          monto: number
          porcentaje: number
          trabajo_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          monto: number
          porcentaje?: number
          trabajo_id: string
        }
        Update: {
          created_at?: string
          id?: string
          monto?: number
          porcentaje?: number
          trabajo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comisiones_trabajo_id_fkey"
            columns: ["trabajo_id"]
            isOneToOne: false
            referencedRelation: "trabajos"
            referencedColumns: ["id"]
          },
        ]
      }
      direcciones: {
        Row: {
          calle: string
          ciudad: string | null
          cliente_id: string
          comuna: string | null
          created_at: string
          id: string
          lat: number | null
          lng: number | null
          numero: string | null
          referencia: string | null
        }
        Insert: {
          calle: string
          ciudad?: string | null
          cliente_id: string
          comuna?: string | null
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          numero?: string | null
          referencia?: string | null
        }
        Update: {
          calle?: string
          ciudad?: string | null
          cliente_id?: string
          comuna?: string | null
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          numero?: string | null
          referencia?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "direcciones_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos: {
        Row: {
          created_at: string
          estado: Database["public"]["Enums"]["estado_documento"]
          id: string
          tecnico_id: string
          tipo: string
          url: string
        }
        Insert: {
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_documento"]
          id?: string
          tecnico_id: string
          tipo: string
          url: string
        }
        Update: {
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_documento"]
          id?: string
          tecnico_id?: string
          tipo?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      especialidades: {
        Row: {
          activo: boolean
          created_at: string
          icono: string | null
          id: string
          nombre: string
        }
        Insert: {
          activo?: boolean
          created_at?: string
          icono?: string | null
          id?: string
          nombre: string
        }
        Update: {
          activo?: boolean
          created_at?: string
          icono?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      pagos: {
        Row: {
          created_at: string
          estado: Database["public"]["Enums"]["estado_pago"]
          id: string
          monto: number
          proveedor: Database["public"]["Enums"]["proveedor_pago"] | null
          referencia_externa: string | null
          trabajo_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_pago"]
          id?: string
          monto: number
          proveedor?: Database["public"]["Enums"]["proveedor_pago"] | null
          referencia_externa?: string | null
          trabajo_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_pago"]
          id?: string
          monto?: number
          proveedor?: Database["public"]["Enums"]["proveedor_pago"] | null
          referencia_externa?: string | null
          trabajo_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pagos_trabajo_id_fkey"
            columns: ["trabajo_id"]
            isOneToOne: false
            referencedRelation: "trabajos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          nombre: string
          role: Database["public"]["Enums"]["user_role"]
          telefono: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          nombre: string
          role?: Database["public"]["Enums"]["user_role"]
          telefono?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          nombre?: string
          role?: Database["public"]["Enums"]["user_role"]
          telefono?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      solicitud_fotos: {
        Row: {
          created_at: string
          id: string
          solicitud_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          solicitud_id: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          solicitud_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "solicitud_fotos_solicitud_id_fkey"
            columns: ["solicitud_id"]
            isOneToOne: false
            referencedRelation: "solicitudes"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitudes: {
        Row: {
          cliente_id: string
          created_at: string
          descripcion: string
          direccion_id: string
          especialidad_id: string
          estado: Database["public"]["Enums"]["estado_solicitud"]
          id: string
          precio_estimado: number | null
          updated_at: string
        }
        Insert: {
          cliente_id: string
          created_at?: string
          descripcion: string
          direccion_id: string
          especialidad_id: string
          estado?: Database["public"]["Enums"]["estado_solicitud"]
          id?: string
          precio_estimado?: number | null
          updated_at?: string
        }
        Update: {
          cliente_id?: string
          created_at?: string
          descripcion?: string
          direccion_id?: string
          especialidad_id?: string
          estado?: Database["public"]["Enums"]["estado_solicitud"]
          id?: string
          precio_estimado?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "solicitudes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitudes_direccion_id_fkey"
            columns: ["direccion_id"]
            isOneToOne: false
            referencedRelation: "direcciones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitudes_especialidad_id_fkey"
            columns: ["especialidad_id"]
            isOneToOne: false
            referencedRelation: "especialidades"
            referencedColumns: ["id"]
          },
        ]
      }
      tecnico_especialidades: {
        Row: {
          especialidad_id: string
          tecnico_id: string
        }
        Insert: {
          especialidad_id: string
          tecnico_id: string
        }
        Update: {
          especialidad_id?: string
          tecnico_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tecnico_especialidades_especialidad_id_fkey"
            columns: ["especialidad_id"]
            isOneToOne: false
            referencedRelation: "especialidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tecnico_especialidades_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
      tecnicos: {
        Row: {
          calificacion_promedio: number | null
          cantidad_trabajos: number
          created_at: string
          estado: Database["public"]["Enums"]["estado_tecnico"]
          id: string
          lat: number | null
          lng: number | null
          updated_at: string
          verificado: boolean
        }
        Insert: {
          calificacion_promedio?: number | null
          cantidad_trabajos?: number
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_tecnico"]
          id: string
          lat?: number | null
          lng?: number | null
          updated_at?: string
          verificado?: boolean
        }
        Update: {
          calificacion_promedio?: number | null
          cantidad_trabajos?: number
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_tecnico"]
          id?: string
          lat?: number | null
          lng?: number | null
          updated_at?: string
          verificado?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "tecnicos_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trabajos: {
        Row: {
          completado_at: string | null
          created_at: string
          estado: Database["public"]["Enums"]["estado_trabajo"]
          id: string
          iniciado_at: string | null
          precio_estimado: number | null
          precio_final: number | null
          solicitud_id: string
          tecnico_id: string
          tiempo_estimado_minutos: number | null
          updated_at: string
        }
        Insert: {
          completado_at?: string | null
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_trabajo"]
          id?: string
          iniciado_at?: string | null
          precio_estimado?: number | null
          precio_final?: number | null
          solicitud_id: string
          tecnico_id: string
          tiempo_estimado_minutos?: number | null
          updated_at?: string
        }
        Update: {
          completado_at?: string | null
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_trabajo"]
          id?: string
          iniciado_at?: string | null
          precio_estimado?: number | null
          precio_final?: number | null
          solicitud_id?: string
          tecnico_id?: string
          tiempo_estimado_minutos?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trabajos_solicitud_id_fkey"
            columns: ["solicitud_id"]
            isOneToOne: false
            referencedRelation: "solicitudes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trabajos_tecnico_id_fkey"
            columns: ["tecnico_id"]
            isOneToOne: false
            referencedRelation: "tecnicos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      estado_documento: "pendiente" | "aprobado" | "rechazado"
      estado_pago: "pendiente" | "pagado" | "fallido" | "reembolsado"
      estado_solicitud: "buscando" | "asignada" | "cancelada"
      estado_tecnico: "disponible" | "ocupado" | "fuera_de_servicio"
      estado_trabajo: "pendiente" | "en_curso" | "completado" | "cancelado"
      proveedor_pago: "mercadopago" | "webpay" | "flow"
      user_role: "cliente" | "tecnico" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estado_documento: ["pendiente", "aprobado", "rechazado"],
      estado_pago: ["pendiente", "pagado", "fallido", "reembolsado"],
      estado_solicitud: ["buscando", "asignada", "cancelada"],
      estado_tecnico: ["disponible", "ocupado", "fuera_de_servicio"],
      estado_trabajo: ["pendiente", "en_curso", "completado", "cancelado"],
      proveedor_pago: ["mercadopago", "webpay", "flow"],
      user_role: ["cliente", "tecnico", "admin"],
    },
  },
} as const

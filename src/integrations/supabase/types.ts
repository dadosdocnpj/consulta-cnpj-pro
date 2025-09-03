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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      cnaes_classes: {
        Row: {
          codigo: string
          created_at: string
          descricao: string | null
          grupo_id: string
          id: string
          nome: string
          slug: string
          total_empresas: number | null
          updated_at: string
        }
        Insert: {
          codigo: string
          created_at?: string
          descricao?: string | null
          grupo_id: string
          id?: string
          nome: string
          slug: string
          total_empresas?: number | null
          updated_at?: string
        }
        Update: {
          codigo?: string
          created_at?: string
          descricao?: string | null
          grupo_id?: string
          id?: string
          nome?: string
          slug?: string
          total_empresas?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cnaes_classes_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "cnaes_grupos"
            referencedColumns: ["id"]
          },
        ]
      }
      cnaes_divisoes: {
        Row: {
          codigo: string
          created_at: string
          descricao: string | null
          id: string
          nome: string
          secao_id: string
          slug: string
          total_empresas: number | null
          updated_at: string
        }
        Insert: {
          codigo: string
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          secao_id: string
          slug: string
          total_empresas?: number | null
          updated_at?: string
        }
        Update: {
          codigo?: string
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          secao_id?: string
          slug?: string
          total_empresas?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cnaes_divisoes_secao_id_fkey"
            columns: ["secao_id"]
            isOneToOne: false
            referencedRelation: "cnaes_secoes"
            referencedColumns: ["id"]
          },
        ]
      }
      cnaes_grupos: {
        Row: {
          codigo: string
          created_at: string
          descricao: string | null
          divisao_id: string
          id: string
          nome: string
          slug: string
          total_empresas: number | null
          updated_at: string
        }
        Insert: {
          codigo: string
          created_at?: string
          descricao?: string | null
          divisao_id: string
          id?: string
          nome: string
          slug: string
          total_empresas?: number | null
          updated_at?: string
        }
        Update: {
          codigo?: string
          created_at?: string
          descricao?: string | null
          divisao_id?: string
          id?: string
          nome?: string
          slug?: string
          total_empresas?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cnaes_grupos_divisao_id_fkey"
            columns: ["divisao_id"]
            isOneToOne: false
            referencedRelation: "cnaes_divisoes"
            referencedColumns: ["id"]
          },
        ]
      }
      cnaes_secoes: {
        Row: {
          codigo: string
          created_at: string
          descricao: string | null
          icone: string | null
          id: string
          nome: string
          slug: string
          total_empresas: number | null
          updated_at: string
        }
        Insert: {
          codigo: string
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          nome: string
          slug: string
          total_empresas?: number | null
          updated_at?: string
        }
        Update: {
          codigo?: string
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          nome?: string
          slug?: string
          total_empresas?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      cnaes_subclasses: {
        Row: {
          classe_id: string
          codigo: string
          created_at: string
          descricao: string | null
          id: string
          is_principal: boolean | null
          nome: string
          slug: string
          total_empresas: number | null
          updated_at: string
        }
        Insert: {
          classe_id: string
          codigo: string
          created_at?: string
          descricao?: string | null
          id?: string
          is_principal?: boolean | null
          nome: string
          slug: string
          total_empresas?: number | null
          updated_at?: string
        }
        Update: {
          classe_id?: string
          codigo?: string
          created_at?: string
          descricao?: string | null
          id?: string
          is_principal?: boolean | null
          nome?: string
          slug?: string
          total_empresas?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cnaes_subclasses_classe_id_fkey"
            columns: ["classe_id"]
            isOneToOne: false
            referencedRelation: "cnaes_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      cnpj_cache: {
        Row: {
          cnpj: string
          created_at: string
          expires_at: string
          html_content: string
          id: string
          json_data: Json
          slug: string
          updated_at: string
        }
        Insert: {
          cnpj: string
          created_at?: string
          expires_at?: string
          html_content: string
          id?: string
          json_data: Json
          slug: string
          updated_at?: string
        }
        Update: {
          cnpj?: string
          created_at?: string
          expires_at?: string
          html_content?: string
          id?: string
          json_data?: Json
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_cache: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const

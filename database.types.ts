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
      predictions: {
        Row: {
          content: string
          created_at: string
          evidence: string | null
          id: string
          possibility: number
          risk: string | null
          status: number
          userId: string | null
          userInfo: Json
        }
        Insert: {
          content: string
          created_at?: string
          evidence?: string | null
          id?: string
          possibility: number
          risk?: string | null
          status?: number
          userId?: string | null
          userInfo?: Json
        }
        Update: {
          content?: string
          created_at?: string
          evidence?: string | null
          id?: string
          possibility?: number
          risk?: string | null
          status?: number
          userId?: string | null
          userInfo?: Json
        }
        Relationships: [
          {
            foreignKeyName: "public_predictions_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reactions: {
        Row: {
          created_at: string
          down: number | null
          fire: number | null
          id: string
          lol: number | null
          thinking: number | null
          up: number | null
          watching: number | null
        }
        Insert: {
          created_at?: string
          down?: number | null
          fire?: number | null
          id: string
          lol?: number | null
          thinking?: number | null
          up?: number | null
          watching?: number | null
        }
        Update: {
          created_at?: string
          down?: number | null
          fire?: number | null
          id?: string
          lol?: number | null
          thinking?: number | null
          up?: number | null
          watching?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_reactions_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "predictions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reactions: {
        Row: {
          created_at: string
          down: boolean | null
          fire: boolean | null
          id: string
          lol: boolean | null
          reaction_id: string | null
          thinking: boolean | null
          up: boolean | null
          user_id: string | null
          watching: boolean | null
        }
        Insert: {
          created_at?: string
          down?: boolean | null
          fire?: boolean | null
          id?: string
          lol?: boolean | null
          reaction_id?: string | null
          thinking?: boolean | null
          up?: boolean | null
          user_id?: string | null
          watching?: boolean | null
        }
        Update: {
          created_at?: string
          down?: boolean | null
          fire?: boolean | null
          id?: string
          lol?: boolean | null
          reaction_id?: string | null
          thinking?: boolean | null
          up?: boolean | null
          user_id?: string | null
          watching?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_user_reactions_reaction_id_fkey"
            columns: ["reaction_id"]
            isOneToOne: false
            referencedRelation: "predictions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

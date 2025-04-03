
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hnjvqihlstlgpywbqgno.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuanZxaWhsc3RsZ3B5d2JxZ25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDg0NTMsImV4cCI6MjA1OTIyNDQ1M30.phbs6nuvhPDWKersUtPnU-2lPJ9Ym0Ud-b4WZYB-28E";

// Extended client definition that includes the 'blogs' table
export type ExtendedDatabase = Database & {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          title: string;
          content: any;
          cover_image?: string;
          created_at: string | null;
          updated_at?: string | null;
          slug?: string | null;
          title_en?: string | null;
          content_en?: any;
        };
        Insert: {
          id?: string;
          title: string;
          content: any;
          cover_image?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          slug?: string | null;
          title_en?: string | null;
          content_en?: any;
        };
        Update: {
          id?: string;
          title?: string;
          content?: any;
          cover_image?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          slug?: string | null;
          title_en?: string | null;
          content_en?: any;
        };
      };
      blog_comments: {
        Row: {
          id: string;
          blog_id: string;
          name: string;
          email: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          blog_id: string;
          name: string;
          email: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          blog_id?: string;
          name?: string;
          email?: string;
          content?: string;
          created_at?: string;
        };
      } & Database['public']['Tables']['blog_comments'];
    } & Database['public']['Tables'];
  };
};

// Create a Supabase client with the extended database definition
export const supabaseExtended = createClient<ExtendedDatabase>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

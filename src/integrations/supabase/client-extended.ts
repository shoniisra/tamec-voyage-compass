
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
          created_at: string;
          updated_at?: string;
          slug?: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: any;
          cover_image?: string;
          created_at?: string;
          updated_at?: string;
          slug?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: any;
          cover_image?: string;
          created_at?: string;
          updated_at?: string;
          slug?: string;
        };
      };
    } & Database['public']['Tables'];
  };
};

// Create a Supabase client with the extended database definition
export const supabaseExtended = createClient<ExtendedDatabase>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

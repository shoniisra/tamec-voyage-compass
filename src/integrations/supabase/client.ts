// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hnjvqihlstlgpywbqgno.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuanZxaWhsc3RsZ3B5d2JxZ25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NDg0NTMsImV4cCI6MjA1OTIyNDQ1M30.phbs6nuvhPDWKersUtPnU-2lPJ9Ym0Ud-b4WZYB-28E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
import { createClient } from "@supabase/supabase-js";

// Usar credenciales reales de Supabase
const supabaseUrl = "https://zlvzcubongnrbkovgtrk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdnpjdWJvbmducmJrb3ZndHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMjMxNDYsImV4cCI6MjA3MzY5OTE0Nn0.iKtGNFLT9gtqVN_rpHeeJaR5sRkN9Lf_7C_zE_KCbkc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

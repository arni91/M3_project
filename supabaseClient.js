import { createClient } from "@supabase/supabase-js";

// Usar credenciales reales de Supabase
const supabaseUrl = "https://jvvcmgknhbriherevikh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2dmNtZ2tuaGJyaWhlcmV2aWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MTM3NjcsImV4cCI6MjA3NDI4OTc2N30.FtgwLE7zd8Nf2PIyStyu7ziPWPcRZv34eUKSI-7m6WI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

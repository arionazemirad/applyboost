import { createBrowserClient } from "@supabase/ssr";

// For client-side usage, we need to use the public environment variables
// If they're not available, we'll use the server-side ones (which won't work in browser)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://itxgmaagcghlwbxlnjoq.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGdtYWFnY2dobHdieGxuam9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzY3NTMsImV4cCI6MjA2MzUxMjc1M30.JW662lq-KRuPsW9wSqT7BaQcP1ej1v6wP5IWign9Qpw";

// Client-side Supabase client for use in Client Components with proper SSR support
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

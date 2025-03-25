
import { createClient } from '@supabase/supabase-js';

// Use env variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://hmmmztyrqhxjovingweq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbW16dHlycWh4am92aW5nd2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzA3NjksImV4cCI6MjA1ODI0Njc2OX0.IPWVZc1dLYpFKs8rBuoHZFsGnwrw-_ol9LdCsQpu7Gs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
});

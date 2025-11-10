import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://orpceuedagnkobapchfk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ycGNldWVkYWdua29iYXBjaGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NjI0NzksImV4cCI6MjA3ODEzODQ3OX0.PPJyKu64u8w9WaZUT50VqPQ3f8nhikdbduS_GW44VMY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

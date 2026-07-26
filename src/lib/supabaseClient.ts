import { createClient } from '@supabase/supabase-js';

// Anon key is safe to expose client-side — the `guestbook` table's Row Level
// Security policies (public select + insert only) are what actually gate access.
const SUPABASE_URL = 'https://xpzoqidmagtsonrvjjmu.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwem9xaWRtYWd0c29ucnZqam11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNzY5NjIsImV4cCI6MjEwMDY1Mjk2Mn0.YhT1sDIUvu4kvX8a3gAj7zjjcFHsFsXbWc0cnI7AYUs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

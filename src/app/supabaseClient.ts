import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jquflrazolnssxpcaiwr.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdWZscmF6b2xuc3N4cGNhaXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0ODM2NTIsImV4cCI6MjA1MjA1OTY1Mn0.mtk6dHF4A0k_8lwGhjQw6WEw34X2mCi1uUFvX-GW8-s'; 

export const supabase = createClient(supabaseUrl, supabaseKey);

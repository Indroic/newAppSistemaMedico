import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rnkqnkvcketqhptlupct.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJua3Fua3Zja2V0cWhwdGx1cGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MTg4NjgsImV4cCI6MjA0MjQ5NDg2OH0.fyoYj71hKfZiQYHwx9zIIWbCBbyq-ZL-Jt7ckgRwOG4";

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

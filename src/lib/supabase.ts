
import { supabase } from '@/integrations/supabase/client';

// Export the supabase client
export { supabase };

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseAnonKey) {
    return true;
  }
  
  // Fallback to hardcoded values if environment variables are not set
  return true; // We have hardcoded values from our Supabase project
};

// Email auth functions
export const signUpWithEmail = async (email: string, password: string) => {
  console.log(`Signing up user with email: ${email}`);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  console.log("Sign up response:", { data, error });
  return { data, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  console.log(`Signing in user with email: ${email}`);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  console.log("Sign in response:", { data, error });
  return { data, error };
};

export const sendEmailVerification = async (email: string) => {
  console.log(`Sending verification email to: ${email}`);
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  
  console.log("Resend verification response:", { data, error });
  return { data, error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  console.log("Get session response:", { data, error });
  return { data, error };
};

export const isEmailVerified = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return false;
  console.log("User verification status:", { 
    email: data.user.email, 
    verified: data.user.email_confirmed_at != null,
    confirmed_at: data.user.email_confirmed_at
  });
  return data.user.email_confirmed_at != null;
};

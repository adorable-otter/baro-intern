import { Database } from './supabase';

export type UserCredential = {
  email: string;
  password: string;
};

export type ProfileInsert = Database['public']['Tables']['user_profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['user_profiles']['Update'];
export type ProfileRow = Database['public']['Tables']['user_profiles']['Row'];

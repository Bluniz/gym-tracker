import { Tables } from '@/database.types';
import { supabaseClient } from './supabase';

export const getExercises = async (userId: string) => {
  return supabaseClient
    .from('exercises')
    .select()
    .eq('user_id', userId)
    .returns<Tables<'exercises'>[]>();
};

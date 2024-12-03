import { Tables } from '@/database.types';
import { supabaseClient } from './supabase';

export const getTrainings = async (userId: string) => {
  return supabaseClient
    .from('training')
    .select()
    .eq('user_id', userId)
    .returns<Tables<'training'>[]>()
    .throwOnError();
};

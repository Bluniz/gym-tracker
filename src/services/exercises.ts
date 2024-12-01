import { Tables } from '@/database.types';
import { supabaseClient } from './supabase';

type CreateExerciseInput = {
  name: string;
  description?: string;
  photo_url?: string;
  exercise_type: string[];
  user_id: string;
};

export const getExercises = async (userId: string) => {
  return supabaseClient
    .from('exercises')
    .select()
    .eq('user_id', userId)
    .returns<Tables<'exercises'>[]>()
    .throwOnError();
};

export const getExerciseTypes = async () => {
  return supabaseClient
    .from('exercises_types')
    .select()
    .returns<Tables<'exercises_types'>[]>()
    .throwOnError();
};

export const createExercise = ({
  name,
  user_id,
  photo_url,
  description,
  exercise_type,
}: CreateExerciseInput) => {
  return supabaseClient
    .from('exercises')
    .insert({
      name,
      user_id,
      photo_url,
      description,
      exercise_type,
    })
    .single()
    .throwOnError();
};

export const deleteExercise = (exerciseId: string) => {
  return supabaseClient.from('exercises').delete().match({ id: exerciseId }).throwOnError();
};

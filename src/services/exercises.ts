import { Tables } from '@/database.types';
import { supabaseClient } from './supabase';
import { CreateExerciseInput, EditExerciseInput } from './types';

export const getExercises = async (userId: string) => {
  return supabaseClient
    .from('exercises')
    .select()
    .eq('user_id', userId)
    .returns<Tables<'exercises'>[]>()
    .throwOnError();
};

export const getExerciseById = (exerciseId: string, userId: string) => {
  return supabaseClient
    .from('exercises')
    .select()
    .match({ id: exerciseId, user_id: userId })
    .single()
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

export const updateExercise = (input: EditExerciseInput) => {
  return supabaseClient
    .from('exercises')
    .update({
      name: input.name,
      description: input.description,
      photo_url: input.photo_url,
      exercise_type: input.exercise_type,
    })
    .match({ id: input.id, user_id: input.user_id })
    .throwOnError();
};

export const deleteExercise = async (exerciseId: string) => {
  return supabaseClient.from('exercises').delete().match({ id: exerciseId }).throwOnError();
};

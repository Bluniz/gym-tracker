import { Tables } from '@/database.types';
import { supabaseClient } from './supabase';
import {
  CompleteTrainingInput,
  CreateTrainingInput,
  UpdateExerciseTrainingInput,
  UpdateTrainingInput,
} from './types';
import { verifyNextAction } from './utils';
import { UpdateExerciseTrainingAction } from './enums';

export const getTrainingDetails = async (trainingId: string) => {
  return supabaseClient.from('training').select().eq('id', trainingId).single().throwOnError();
};

export const getTrainingExercises = async (trainingId: string) => {
  return supabaseClient
    .from('exercises_training')
    .select(
      `
      series,
      reps,
      id,
      exercises (
        id,
        name
      )
    `,
    )
    .eq('training_id', trainingId)
    .throwOnError();
};

export const getTrainingById = async (id: string) => {
  return supabaseClient.from('training').select().eq('id', id).single().throwOnError();
};

export const getTrainings = async (userId: string) => {
  return supabaseClient
    .from('training')
    .select()
    .eq('user_id', userId)
    .returns<Tables<'training'>[]>()
    .throwOnError();
};

export const createTraining = async ({
  user_id,
  exercise_name,
  exercise_observation,
  selectedExercises,
}: CreateTrainingInput) => {
  const currentTrainings = await getTrainings(user_id);

  if (currentTrainings?.data?.some((training) => training.name === exercise_name)) {
    throw new Error("You can't have two trainings with the same name");
  }

  const training = await supabaseClient
    .from('training')
    .upsert({
      name: exercise_name,
      observation: exercise_observation,
      user_id: user_id,
    })
    .select()
    .single()
    .throwOnError();

  if (training.data) {
    const training_id = training.data.id;

    const exercise_training_data = selectedExercises.map(({ id, series, reps, ...rest }) => ({
      exercise_id: Number(id),
      series: Number(series),
      reps: reps,
      training_id,
      annotation: '',
    }));

    await supabaseClient.from('exercises_training').insert(exercise_training_data).throwOnError();

    return training_id;
  } else {
    throw new Error('Training not created');
  }
};

export const completeTraining = ({ id, completed_count }: CompleteTrainingInput) => {
  return supabaseClient.from('training').update({ completed_count }).eq('id', id).throwOnError();
};

export const deleteTraining = async (id: string) => {
  return supabaseClient.from('training').delete().eq('id', id).throwOnError();
};

export const updateTraining = async ({ id, name, observation }: UpdateTrainingInput) => {
  return supabaseClient.from('training').update({ name, observation }).eq('id', id).throwOnError();
};

export const updateExerciseTraining = async ({
  selectedExercises,
  trainingId,
}: UpdateExerciseTrainingInput) => {
  const { data } = await supabaseClient
    .from('exercises_training')
    .select()
    .eq('training_id', trainingId)
    .throwOnError();

  if (data?.length === 0) {
    const exercise_training_data = selectedExercises.map(({ id, series, reps, ...rest }) => ({
      exercise_id: Number(id),
      series: Number(series),
      reps: reps,
      training_id: Number(trainingId),
      annotation: '',
    }));

    return await supabaseClient
      .from('exercises_training')
      .insert(exercise_training_data)
      .throwOnError();
  }

  const verifiedData = verifyNextAction(selectedExercises, data);

  verifiedData?.actions.forEach(async (action) => {
    switch (action) {
      case UpdateExerciseTrainingAction.CREATE:
        verifiedData.data.create.forEach(async (item) => {
          await supabaseClient
            .from('exercises_training')
            .insert({
              exercise_id: Number(item.id),
              series: Number(item.series),
              reps: item.reps,
              training_id: Number(trainingId),
              annotation: '',
            })
            .throwOnError();
        });
        break;
      case UpdateExerciseTrainingAction.UPDATE:
        verifiedData.data.update.forEach(async (item) => {
          await supabaseClient
            .from('exercises_training')
            .update({
              series: Number(item.series),
              reps: item.reps,
            })
            .eq('training_id', trainingId)
            .eq('exercise_id', item.id)
            .throwOnError();
        });
        break;
      case UpdateExerciseTrainingAction.DELETE:
        verifiedData.data.delete.forEach(async (item) => {
          await supabaseClient
            .from('exercises_training')
            .delete()
            .eq('training_id', trainingId)
            .eq('exercise_id', item.exercise_id)
            .throwOnError();
        });
        break;
      default:
    }
  });
};

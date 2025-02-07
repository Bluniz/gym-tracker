import { Tables } from '@/database.types';
import { SelectedExercises } from './types';
import { UpdateExerciseTrainingAction } from './enums';

export function verifyNextAction(
  arr1: SelectedExercises[],
  arr2: Tables<'exercises_training'>[] | null,
) {
  if (!arr1 || !arr2) {
    return;
  }

  const itemsToCreate = arr1.filter(
    (item1) => !arr2.some((item2) => String(item1.id) === String(item2.exercise_id)),
  );

  const itemsToUpdate = arr1.filter((item1) =>
    arr2.some((item2) => String(item1.id) === String(item2.exercise_id)),
  );

  const itemsToDelete = arr2.filter(
    (item2) => !arr1.some((item1) => String(item1.id) === String(item2.exercise_id)),
  );

  const actions = [];
  const data: Record<string, any[]> = {};

  if (itemsToCreate.length) {
    actions.push(UpdateExerciseTrainingAction.CREATE);
    data.create = itemsToCreate;
  }
  if (itemsToUpdate.length) {
    actions.push(UpdateExerciseTrainingAction.UPDATE);

    data.update = itemsToUpdate;
  }
  if (itemsToDelete.length) {
    actions.push(UpdateExerciseTrainingAction.DELETE);

    data.delete = itemsToDelete;
  }

  return { actions, data };
}

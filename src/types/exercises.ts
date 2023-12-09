export interface Exercise {
  name: string;
  series: string;
  reps: string;
  weight: string;
  last_weight: string;
  id: string;
}

export interface CreateExercisesProps {
  name: string;
  series?: string;
  reps?: string;
  weight?: string;
  last_weight?: string;
  id?: string;
}

export interface WeightHistory {
  value: number;
  date: string;
}

export type ExercisesParamslist = {
  listExercises: undefined;
  addExercises: undefined;
};

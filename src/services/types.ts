export interface CreateExerciseInput {
  name: string;
  description?: string;
  photo_url?: string;
  exercise_type: string[];
  user_id: string;
}

export interface EditExerciseInput {
  id: string;
  name: string;
  description?: string;
  photo_url?: string;
  exercise_type: string[];
  user_id: string;
}

export interface CreateTrainingInput {
  user_id: string;
  exercise_name: string;
  exercise_observation: string;
  selectedExercises: {
    id: string;
    reps: string;
    series: string;
  }[];
}

export interface TrainingExercises {
  series: number | null;
  reps: string | null;
  training: {
    name: string;
    observation: string | null;
  } | null;
  exercises: {
    name: string;
  } | null;
}

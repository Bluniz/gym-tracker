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

export interface TrainingDetails {
  id: number;
  name: string;
  observation: string | null;
  created_at: string;
  complete_count: number;
}

export interface TrainingExercises {
  series: number | null;
  reps: string | null;
  id: number;
  exercises: {
    name: string;
  } | null;
}

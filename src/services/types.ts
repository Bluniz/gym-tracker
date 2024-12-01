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

import { Workout, WorkoutWithExercises } from "../../types/workout";

export interface WorkoutSlice {
  workouts: Workout[];
  workout: WorkoutWithExercises | null;

  isWorkoutDetailsLoading: boolean;
  isWorkoutsLoading: boolean;
  isWorkoutsRefreshing: boolean;


  startWorkoutsLoading: () => void;
  finishWorkoutsLoading: () => void;

  startWorkoutDetailsLoading: () => void;
  finishWorkoutDetailsLoading: () => void;
  startWorkouRefeshingLoading: () => void;
  finishWorkouRefeshingLoading: () => void;

  getWorkouts: (type?: 'refresh') => Promise<void>;
  getWorkout: (id: string) => Promise<void>;
  completeWorkout: (
    id: string | undefined,
    complete_time: number,
    done_photo?: string
  ) => Promise<void>;

  createWorkout: (params: CreateWorkoutParams) => Promise<void>
  updateWorkout: (params: UpdateWorkoutParams) => Promise<void>
  deleteWorkout: (id: string) => Promise<void>
   
}

export interface CompleteWorkoutParams {
  id?: string 
  complete_time: number 
  done_photo?: string
}

export interface CreateWorkoutParams {
  title: string 
  exercises: string[]
}

export interface UpdateWorkoutParams {
  name: string 
  exercises: string[]
  id: string
}
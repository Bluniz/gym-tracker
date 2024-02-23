import {RouteProp} from '@react-navigation/native';
import {Exercise} from './exercises';

export type WorkoutParamsList = {
  workoutDetails: {id: string} | undefined;
  addWorkout: undefined
};

export type WorkoutScreenRouteProp = RouteProp<
  WorkoutParamsList,
  'workoutDetails'
>;

export interface CompleteHistory {
  time: number;
  date: string;
}

export interface Workout {
  complete_history: CompleteHistory[];
  complete_qtd: number;
  created_at: string;
  exercices: string[];
  name: string;
  id: string;
}

export interface WorkoutWithExercises extends Omit<Workout, 'exercices'> {
  exercices: Exercise[];
}

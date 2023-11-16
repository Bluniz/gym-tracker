import {RouteProp} from '@react-navigation/native';
import {Exercise} from './exercises';

export type WorkoutParamsList = {
  workout: {id: string} | undefined;
};

export type WorkoutScreenRouteProp = RouteProp<WorkoutParamsList, 'workout'>;

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

export interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}

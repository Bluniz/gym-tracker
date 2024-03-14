import {StateCreator} from 'zustand';
import {GlobalLoadingSlice} from './globalLoadingSlice';
import Toast from 'react-native-root-toast';
import {completeWorkout, getWorkout, listWorkouts} from '../../services';
import { WorkoutSlice } from '../types/workoutTypes';
import * as WorkoutHelper from '../helpers/workoutHelper';


export const createWorkoutSlice: StateCreator<
  WorkoutSlice & GlobalLoadingSlice,
  [],
  [],
  WorkoutSlice
> = (set, get) => ({
  workouts: [],
  workout: null,
  isWorkoutsRefreshing: false,

  isWorkoutsLoading: false,
  isWorkoutDetailsLoading: false,

  startWorkoutsLoading: () => WorkoutHelper.startWorkoutsLoading(set),
  finishWorkoutsLoading: () => WorkoutHelper.finishWorkoutsLoading(set),
  startWorkoutDetailsLoading: () => WorkoutHelper.startWorkoutDetailsLoading(set),
  finishWorkoutDetailsLoading: () => WorkoutHelper. finishWorkoutDetailsLoading(set),
  startWorkouRefeshingLoading: () => WorkoutHelper.startWorkouRefeshingLoading(set),
  finishWorkouRefeshingLoading: () =>WorkoutHelper.finishWorkouRefeshingLoading(set),

  getWorkouts: async type => WorkoutHelper.getWorkouts(set, get, type),

  getWorkout: async id => WorkoutHelper.getWorkoutHelper(set, get, id),

  completeWorkout: async (id, complete_time, done_photo) => WorkoutHelper.completeWorkoutHelper(set, get, {id, complete_time, done_photo}),

  
});

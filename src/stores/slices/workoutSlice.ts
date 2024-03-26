import {StateCreator} from 'zustand';
import {GlobalLoadingSlice} from './globalLoadingSlice';
import { CreateWorkoutParams, UpdateWorkoutParams, WorkoutSlice } from '../types/workoutTypes';
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
  isLoadingCreateOrUpdate: false,

  startWorkoutsLoading: () => WorkoutHelper.startWorkoutsLoading(set),
  finishWorkoutsLoading: () => WorkoutHelper.finishWorkoutsLoading(set),
  startWorkoutDetailsLoading: () => WorkoutHelper.startWorkoutDetailsLoading(set),
  finishWorkoutDetailsLoading: () => WorkoutHelper. finishWorkoutDetailsLoading(set),
  startWorkouRefeshingLoading: () => WorkoutHelper.startWorkouRefeshingLoading(set),
  finishWorkouRefeshingLoading: () =>WorkoutHelper.finishWorkouRefeshingLoading(set),

  getWorkouts: async type => WorkoutHelper.getWorkouts(set, get, type),

  getWorkout: async id => WorkoutHelper.getWorkoutHelper(set, get, id),

  completeWorkout: async (id, complete_time, done_photo) => WorkoutHelper.completeWorkoutHelper(set, get, {id, complete_time, done_photo}),

  createWorkout: async (props: CreateWorkoutParams) => WorkoutHelper.createWorkoutHelper(set, get, props),

  updateWorkout: async (props: UpdateWorkoutParams) => WorkoutHelper.updateWorkoutHelper(set, get, props),

  deleteWorkout: async (id: string) => WorkoutHelper.deleteWorkoutHelper(set, get, id)
});

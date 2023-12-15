import {StateCreator} from 'zustand';
import {Workout, WorkoutWithExercises} from '../../types/workout';
import {GlobalLoadingSlice} from './globalLoadingSlice';
import Toast from 'react-native-root-toast';
import {getWorkout, listWorkouts} from '../../services';

export interface WorkoutSlice {
  workouts: Workout[];
  workout: WorkoutWithExercises | null;

  isWorkoutDetailsLoading: boolean;
  isWorkoutsLoading: boolean;

  startWorkoutsLoading: () => void;
  finishWorkoutsLoading: () => void;

  startWorkoutDetailsLoading: () => void;
  finishWorkoutDetailsLoading: () => void;

  getWorkouts: () => Promise<void>;
  getWorkout: (id: string) => Promise<void>;
}

export const createWorkoutSlice: StateCreator<
  WorkoutSlice & GlobalLoadingSlice,
  [],
  [],
  WorkoutSlice
> = (set, get) => ({
  workouts: [],
  workout: null,

  isWorkoutsLoading: false,
  isWorkoutDetailsLoading: false,

  startWorkoutsLoading: () => set(() => ({isWorkoutsLoading: true})),
  finishWorkoutsLoading: () => set(() => ({isWorkoutsLoading: false})),

  startWorkoutDetailsLoading: () =>
    set(() => ({isWorkoutDetailsLoading: true})),
  finishWorkoutDetailsLoading: () =>
    set(() => ({isWorkoutDetailsLoading: false})),

  getWorkouts: async () => {
    try {
      //if (!isUpdate) get().startExercisesLoading();
      get().startWorkoutsLoading();
      const workouts = await listWorkouts();
      set(() => ({workouts}));
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      //if (!isUpdate) get().finishExercisesLoading();
      get().finishWorkoutsLoading();
    }
  },

  getWorkout: async id => {
    try {
      get().startWorkoutDetailsLoading();
      const workout = await getWorkout(id);
      set(() => ({workout}));
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishWorkoutDetailsLoading();
    }
  },
});

import {StateCreator} from 'zustand';
import {Workout} from '../../types/workout';
import {GlobalLoadingSlice} from './globalLoadingSlice';
import Toast from 'react-native-root-toast';
import {listWorkouts} from '../../services';

export interface WorkoutSlice {
  workouts: Workout[];
  isWorkoutsLoading: boolean;

  startWorkoutsLoading: () => void;
  finishWorkoutsLoading: () => void;

  getWorkouts: () => Promise<void>;
}

export const createWorkoutSlice: StateCreator<
  WorkoutSlice & GlobalLoadingSlice,
  [],
  [],
  WorkoutSlice
> = (set, get) => ({
  workouts: [],
  isWorkoutsLoading: false,
  startWorkoutsLoading: () => set(() => ({isWorkoutsLoading: true})),
  finishWorkoutsLoading: () => set(() => ({isWorkoutsLoading: false})),

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
});

import {create} from 'zustand';
import {
  createGlobalLoadingSlice,
  GlobalLoadingSlice,
  ExercisesSlice,
  createExercisesSlice,
  createWorkoutSlice,
  WorkoutSlice,
} from './slices';

export const useStore = create<
  GlobalLoadingSlice & ExercisesSlice & WorkoutSlice
>((...props) => ({
  ...createGlobalLoadingSlice(...props),
  ...createExercisesSlice(...props),
  ...createWorkoutSlice(...props),
}));

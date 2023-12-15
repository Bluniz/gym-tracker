import {create} from 'zustand';
import {
  createGlobalLoadingSlice,
  GlobalLoadingSlice,
  ExercisesSlice,
  createExercisesSlice,
  createWorkoutSlice,
  WorkoutSlice,
  createAuthSlice,
  AuthSlice,
} from './slices';

export const useStore = create<
  GlobalLoadingSlice & ExercisesSlice & WorkoutSlice & AuthSlice
>((...props) => ({
  ...createGlobalLoadingSlice(...props),
  ...createExercisesSlice(...props),
  ...createWorkoutSlice(...props),
  ...createAuthSlice(...props),
}));

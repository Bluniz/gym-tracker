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
  createCronometerSlice,
  CronometerSlice,
} from './slices';

export const useStore = create<
  GlobalLoadingSlice &
    ExercisesSlice &
    WorkoutSlice &
    AuthSlice &
    CronometerSlice
>((...props) => ({
  ...createGlobalLoadingSlice(...props),
  ...createExercisesSlice(...props),
  ...createWorkoutSlice(...props),
  ...createAuthSlice(...props),
  ...createCronometerSlice(...props),
}));

import {create} from 'zustand';
import {
  createGlobalLoadingSlice,
  GlobalLoadingSlice,
  ExercisesSlice,
  createExercisesSlice,
} from './slices';

export const useStore = create<GlobalLoadingSlice & ExercisesSlice>(
  (...props) => ({
    ...createGlobalLoadingSlice(...props),
    ...createExercisesSlice(...props),
  })
);

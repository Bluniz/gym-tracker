import zustand, {create} from 'zustand';
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
import { persist, createJSONStorage, devtools } from 'zustand/middleware'
import { zustandStorage } from '../services/storage';


type BoundedType = GlobalLoadingSlice &
    ExercisesSlice &
    WorkoutSlice &
    AuthSlice &
    CronometerSlice

// export const useStore = create<BoundedType>((...props) => ({
//   ...createGlobalLoadingSlice(...props),
//   ...createExercisesSlice(...props),
//   ...createWorkoutSlice(...props),
//   ...createAuthSlice(...props),
//   ...createCronometerSlice(...props),
// }));

// @ts-ignore
 export const useStore = create<BoundedType>(persist((...props) => ({  ...createGlobalLoadingSlice(...props),
  ...createExercisesSlice(...props),
  ...createWorkoutSlice(...props),
  ...createAuthSlice(...props),
  ...createCronometerSlice(...props),}), {name: 'test', storage: createJSONStorage(() => zustandStorage ) }));


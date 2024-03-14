import  {create} from 'zustand';
import {
  createGlobalLoadingSlice,
  GlobalLoadingSlice,
  ExercisesSlice,
  createExercisesSlice,
  createWorkoutSlice,
  createAuthSlice,
  AuthSlice,
  createCronometerSlice,
  CronometerSlice,
  HistorySlice,
} from './slices';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { zustandStorage } from '../services/storage';
import { createHistorySlice } from './slices/historySlice';
import { WorkoutSlice } from './types/workoutTypes';


type BoundedType = GlobalLoadingSlice &
    ExercisesSlice &
    WorkoutSlice &
    AuthSlice &
    CronometerSlice & HistorySlice



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useStore = create<BoundedType>(persist((...props) => ({
  ...createGlobalLoadingSlice(...props),
  ...createExercisesSlice(...props),
  ...createWorkoutSlice(...props),
  ...createAuthSlice(...props),
  ...createCronometerSlice(...props),
  ...createHistorySlice(...props)

}), {name: 'test', storage: createJSONStorage(() => zustandStorage ) }));


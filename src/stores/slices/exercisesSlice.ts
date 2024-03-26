import {StateCreator} from 'zustand';
import {CreateExercisesProps, Exercise} from '../../types/exercises';
import {
  createExercises,
  deleteExercise,
  listExercises,
  updateExercise,
} from '../../services';
import Toast from 'react-native-root-toast';
import {GlobalLoadingSlice} from './globalLoadingSlice';

export interface ExercisesSlice {
  exercises: Exercise[];
  isExercisesLoading: boolean;
  isExercisesRefreshing: boolean;
  

  startExercisesLoading: () => void;
  finishExercisesLoading: () => void;
  startRefreshExercisesLoading: () => void;
  finishRefreshExercisesLoading: () => void;

  getExercises: (type?: 'update' | 'refresh') => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
  createExercise: (
    variables: CreateExercisesProps,
    callback?: () => void
  ) => Promise<void>;
  updateExercise: (
    variables: CreateExercisesProps,
    callback?: () => void
  ) => Promise<void>;
}

export const createExercisesSlice: StateCreator<
  ExercisesSlice & GlobalLoadingSlice,
  [],
  [],
  ExercisesSlice
> = (set, get) => ({
  exercises: [],
  isExercisesLoading: false,
  isExercisesRefreshing: false,

  startExercisesLoading: () => set(() => ({isExercisesLoading: true})),
  finishExercisesLoading: () => set(() => ({isExercisesLoading: false})),
  startRefreshExercisesLoading: () =>
    set(() => ({isExercisesRefreshing: true})),
  finishRefreshExercisesLoading: () =>
    set(() => ({isExercisesRefreshing: false})),

  getExercises: async type => {
    try {
      if (!type) get().startExercisesLoading();
      if (type === 'refresh') get().startRefreshExercisesLoading();

      const exercises = await listExercises();
      set(() => ({exercises}));
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      if (!type) get().finishExercisesLoading();
      if (type === 'refresh') get().finishRefreshExercisesLoading();
    }
  },

  deleteExercise: async id => {
    try {
      get().startLoading();

      await deleteExercise(id);
      await get().getExercises('update');
      Toast.show('Exercise deleted!');
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishLoading();
    }
  },

  createExercise: async (variables, callback) => {
    try {
      get().startLoading();

      await createExercises(variables);
      callback?.();
      Toast.show('Exercise created!');
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishLoading();
    }
  },

  updateExercise: async (variables, callback) => {
    try {
      get().startLoading();

      await updateExercise(variables);
      Toast.show('Exercise updated!');
      callback?.();
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishLoading();
    }
  },
});

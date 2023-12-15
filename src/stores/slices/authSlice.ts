import {StateCreator} from 'zustand';
import Toast from 'react-native-root-toast';

import {CreateUserVariables, LogInVariables, User} from '../../types/user';
import {GlobalLoadingSlice} from './globalLoadingSlice';
import {logIn, logOut, createUser as createRegister} from '../../services';

export interface AuthSlice {
  user: User | null;
  authError?: string | null;
  authLoading: boolean;

  startAuthLoading: () => void;
  finishAuthLoading: () => void;

  setUser: (variables: User) => void;

  signIn: (variables: LogInVariables, callback?: () => void) => void;
  signOut: () => void;
  clearError: () => void;
  createUser: (variables: CreateUserVariables, callback?: () => void) => void;
}

export const createAuthSlice: StateCreator<
  AuthSlice & GlobalLoadingSlice,
  [],
  [],
  AuthSlice
> = (set, get) => ({
  user: null,
  authError: null,
  authLoading: true,

  startAuthLoading: () => set(() => ({authLoading: true})),
  finishAuthLoading: () => set(() => ({authLoading: false})),

  setUser: variables => set(() => ({user: variables})),

  signIn: async (variables, callback) => {
    try {
      get().startAuthLoading();
      const data = await logIn(variables.email, variables.password);
      set(() => ({user: data, authError: null}));
      callback?.();
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishAuthLoading();
    }
  },

  signOut: async () => {
    try {
      get().startAuthLoading();
      await logOut();
      set(() => ({user: null}));
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishAuthLoading();
    }
  },

  createUser: async (variables, callback) => {
    try {
      get().startAuthLoading();
      const data = await createRegister(
        variables.email,
        variables.password,
        variables.displayName
      );

      set(() => ({user: data}));
      callback?.();
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishAuthLoading();
    }
  },

  clearError: () => set(() => ({authError: null})),
});

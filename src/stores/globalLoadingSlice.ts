import {StateCreator} from 'zustand';

export interface GlobalLoadingSlice {
  isLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
}

export const createGlobalLoadingSlice: StateCreator<
  GlobalLoadingSlice,
  [],
  [],
  GlobalLoadingSlice
> = set => ({
  isLoading: false,
  startLoading: () => set(() => ({isLoading: true})),
  finishLoading: () => set(() => ({isLoading: false})),
});

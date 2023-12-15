import {create} from 'zustand';
import {
  createGlobalLoadingSlice,
  GlobalLoadingSlice,
} from './globalLoadingSlice';

export const useStore = create<GlobalLoadingSlice>((...props) => ({
  ...createGlobalLoadingSlice(...props),
}));

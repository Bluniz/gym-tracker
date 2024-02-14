import {StateCreator} from 'zustand';
import { IHistory } from '../../types/history';
import { listHistories } from '../../services/history';


export interface HistorySlice {
  data: IHistory[]
  isHistoryLoading: boolean
  historyError?: boolean
  loadHistory: () => void
  handleStartHistoryLoading: () => void 
  handleFinishHistoryLoading: () => void
}


export const createHistorySlice: StateCreator<HistorySlice> = (set, get) => ({
  data: [],
  isHistoryLoading: false,
  historyError: undefined,
  loadHistory: async () => {
    try {
      get().handleStartHistoryLoading();
      set({historyError: false});
      const data = await listHistories();
      set({data});
    } catch(error){
      set({historyError: true});
    } finally {
      get().handleFinishHistoryLoading();
    }
  },
  handleStartHistoryLoading: () => {
    set({isHistoryLoading: true});
  },
  handleFinishHistoryLoading: () => {
    set({isHistoryLoading: false});

  }
});
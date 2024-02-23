import {StateCreator} from 'zustand';
import { IHistory } from '../../types/history';
import { listHistories } from '../../services/history';


export interface HistorySlice {
  histories: IHistory[]
  isHistoryLoading: boolean
  isHistoryRefreshing: boolean
  historyError?: boolean
  loadHistory: (type?: string) => Promise<void>
  handleStartHistoryLoading: () => void 
  handleFinishHistoryLoading: () => void
   startRefreshHistory: () => void;
  finishRefreshHistory: () => void;
}


export const createHistorySlice: StateCreator<HistorySlice> = (set, get) => ({
  histories: [],
  isHistoryLoading: false,
  isHistoryRefreshing: false,
  historyError: undefined,
  loadHistory: async (type) => {
    try {

      if(type === 'refresh') get().startRefreshHistory();

      if(!type) get().handleStartHistoryLoading();
      set({historyError: false});
      const data = await listHistories();
      set({histories: data});
    } catch(error){
      set({historyError: true});
    } finally {
     

      if(type === 'refresh') get().finishRefreshHistory();

      if(!type)  get().handleFinishHistoryLoading();
    }
  },
  handleStartHistoryLoading: () => {
    set({isHistoryLoading: true});
  },
  handleFinishHistoryLoading: () => {
    set({isHistoryLoading: false});
  },
  startRefreshHistory: () => set({isHistoryRefreshing: true}),
  finishRefreshHistory: () => set({isHistoryRefreshing: false}),
});
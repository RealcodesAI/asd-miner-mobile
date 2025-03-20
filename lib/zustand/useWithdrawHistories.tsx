import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../utils/toastService";
import { getUserStore } from "./getUser";

interface WithdrawState {
  histories: {
    contents: any[];
    total: number;
    page: number;
    limit: number;
  } | null;
  isLoading: boolean;
  threshold: number ;
  setThreshold: (threshold: number) => void;
  fetchWithdrawHistories: (params?: any) => Promise<void>;
  updateRewardThreshold: () => Promise<void>;
}

export const useWithdrawHistories = create<WithdrawState>((set,get) => ({
  histories: null,
  isLoading: false,
  threshold: 0,
  setThreshold: (threshold) => set({ threshold }),

  fetchWithdrawHistories: async (params = {}) => {
    set({ isLoading: true });

    try {
      const jwt = await AsyncStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("Authentication required");
      }

      const response = await AsdApi.withdrawHistories(params);
      set({ histories: response, isLoading: false });
    } catch (error: any) {
      showToast(`Failed to fetch withdraw histories: ${error.message}`, 'danger');
      console.log("Failed to fetch withdraw histories:", error);
      set({ isLoading: false });
    }
  },
  updateRewardThreshold: async () => {
    const {threshold,setThreshold} = get()
    if(!threshold) {
      showToast("Please enter your threshold!", 'danger');
      return;
    }
    if (threshold < 100) {
      showToast("Threshold must be at least 100!", 'danger');
      return;
    }
    try {
      await AsdApi.updateRewardThreshold(threshold);
      setThreshold(threshold)
      const { getUserWallet } = getUserStore.getState();
      await getUserWallet();
      showToast("Threshold updated successfully!", 'success');
    } catch (err: any) {
      console.log("Error saving miner config:", err);
      showToast(err.message, 'danger');
    }
  }
}));
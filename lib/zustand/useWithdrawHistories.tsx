import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      ToastAndroid.show(`Failed to fetch withdraw histories: ${error.message}`, ToastAndroid.SHORT);
      console.error("Failed to fetch withdraw histories:", error);
      set({ isLoading: false });
    }
  },
  updateRewardThreshold: async () => {
    const {threshold,setThreshold} = get()
    if(!threshold) {
      ToastAndroid.show("Please enter your threshold!", ToastAndroid.SHORT);
      return;
    }
    if (threshold < 100) {
      ToastAndroid.show("Threshold must be at least 100!", ToastAndroid.SHORT);
      return;
    }
    try {
      await AsdApi.updateRewardThreshold(threshold);
      setThreshold(threshold)
      ToastAndroid.show("Threshold updated successfully!", ToastAndroid.SHORT);
    } catch (err: any) {
      console.error("Error saving miner config:", err);
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  }
}));
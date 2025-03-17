import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RewardsState {
  rewards: {
    contents: any[];
    total: number;
    page: number;
    limit: number;
  } | null;
  isLoading: boolean;
  fetchRewards: (params?: any, id?: any) => Promise<void>;
}

export const useRewards = create<RewardsState>((set) => ({
  rewards: null,
  isLoading: false,
  fetchRewards: async (params = {}, id: number) => {
    set({ isLoading: true });

    try {
      const jwt = await AsyncStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("Authentication required");
      }

      const response = await AsdApi.rewards(params, id);
      set({ rewards: response, isLoading: false });
    } catch (error: any) {
      ToastAndroid.show(`Failed to fetch rewards: ${error.message}`, ToastAndroid.SHORT);
      console.error("Failed to fetch rewards:", error);
      set({ isLoading: false });
    }
  },
}));
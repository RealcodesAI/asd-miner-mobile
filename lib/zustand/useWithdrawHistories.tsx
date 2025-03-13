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
  fetchWithdrawHistories: (params?: any) => Promise<void>;
}

export const useWithdrawHistories = create<WithdrawState>((set) => ({
  histories: null,
  isLoading: false,

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
}));
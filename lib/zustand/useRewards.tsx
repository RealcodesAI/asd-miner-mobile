import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import showToast from "../utils/toastService";

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
      const response = await AsdApi.rewards(params, id);
      set({ rewards: response, isLoading: false });
    } catch (error: any) {
      showToast(error.message,"danger");
      console.error("Failed to fetch rewards:", error);
      set({ isLoading: false });
    }
  },
}));
import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";

interface User {
  id: number;
  ct360UserName: string;
  walletAddress: string;
  ct360UserId: number;
  rewardThreshold: number
}

interface AuthState {
  user: User | null;
  getMe: () => Promise<void>;
}

export const getUserStore = create<AuthState>((set) => ({
  user: null,

  getMe: async () => {
    try {
      const response = await AsdApi.getMe();
      set({ user: response });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
}));

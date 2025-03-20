import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import showToast from "../utils/toastService";

interface User {
  id: number;
  username: string;
  walletAddress: string;
  ct360UserId: number;
  rewardThreshold: number
  avatar: string;
}

interface UserWallte {
  id: number
  walletAddress: string;
  rewardThreshold: number
}

interface AuthState {
  user: User | null;
  userWallet: UserWallte | null;
  setUserWallet: (userWallet: UserWallte | null) => void;
  setUser: (user: User | null) => void;
  getMe: () => Promise<void>;
  getUserWallet: () => Promise<void>;
}

export const getUserStore = create<AuthState>((set) => ({
  user: null,
  userWallet: null,
  setUserWallet: (userWallet) => set({ userWallet }),
  setUser: (user) => set({ user }),

  getMe: async () => {
    try {
      const response = await AsdApi.getMe();
      console.log("User fetched successfully:", response);
      set({ user: response });
    } catch (err: any) {
      console.log("Error fetching user:", err);
      showToast(err.message,"danger")
    }
  },

  getUserWallet: async () => {
    try {
      const response = await AsdApi.getMeWallet()
      console.log("User wallet fetched successfully:", response);
      set({ userWallet: response });
    } catch (err: any) {
      console.log(err.message);
      showToast(err.message,"danger")
    }
  }
}));

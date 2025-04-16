import { create } from "zustand";
import showToast from "../utils/toastService";
import { AsdApi } from "../api/service/asdApi";
import * as SecureStore from "expo-secure-store";

interface WalletState {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  updateWallteAddress: () => Promise<void>;
}

export const updateWallteStore = create<WalletState>((set,get) => ({
walletAddress: '',
setWalletAddress: (address) => set({ walletAddress: address }),

updateWallteAddress: async () => {
    const {walletAddress} = get()
    if(!walletAddress) {
      showToast("Please enter your wallet address!","danger")
        return;
    }
    try {
        await AsdApi.updateWallte(walletAddress);
        await SecureStore.setItemAsync("walletAddress", JSON.stringify({ walletAddress }));
        showToast("Wallet updated successfully!","success")
      } catch (err: any) {
        console.log("Error saving miner config:", err);
        showToast(err.message,"danger")
    } 
}
}))
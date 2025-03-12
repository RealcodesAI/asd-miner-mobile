import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MinerState {
  walletAddress: string;
  minerName: string;
  minerLicense: string;
  isConfigured: boolean;
  setWalletAddress: (address: string) => void;
  setMinerName: (name: string) => void;
  setMinerLicense: (license: string) => void;
  saveMinerConfig: () => Promise<void>;
  loadMinerConfig: () => Promise<void>;
}

export const useMinerStore = create<MinerState>((set, get) => ({
  walletAddress: "",
  minerName: "",
  minerLicense: "",
  isConfigured: false,

  setWalletAddress: (address) => set({ walletAddress: address }),
  setMinerName: (name) => set({ minerName: name }),
  setMinerLicense: (license) => set({ minerLicense: license }),

  saveMinerConfig: async () => {
    const { minerLicense, minerName, walletAddress } = get();
    if (!walletAddress || !minerLicense || !minerName) {
        ToastAndroid.show("Please fill in all fields!", ToastAndroid.SHORT);
        return;
      }
    try {
      await AsdApi.minerConfig(minerLicense, minerName);
      const minerData = { walletAddress, minerLicense, minerName, isConfigured: true };
       await AsyncStorage.setItem("minerConfig", JSON.stringify(minerData));
      set({ isConfigured: true });
      ToastAndroid.show(
        "Miner configuration saved successfully!",
        ToastAndroid.SHORT
      );
    } catch (err: any) {
      console.error("Error saving miner config:", err);
      ToastAndroid.show(err.message,ToastAndroid.SHORT);
    }
  },
  loadMinerConfig: async () => {
    try {
      const savedConfig = await AsyncStorage.getItem("minerConfig");
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        console.log("Loaded miner config:", parsedConfig);
        set(parsedConfig);
      }
    } catch (err) {
      console.error("Error loading miner config:", err);
    }
  },
}));

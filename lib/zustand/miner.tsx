import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MinerState {
  walletAddress: string;
  minerName: string;
  nameLicense: string
  minerLicense: string;
  isConfigured: boolean;
  setWalletAddress: (address: string) => void;
  setMinerName: (name: string) => void;
  setNameLicense: (namelicense: string) => void;
  setMinerLicense: (license: string) => void;
  saveMinerConfig: () => Promise<void>;
  loadMinerConfig: () => Promise<void>;
}

export const useMinerStore = create<MinerState>((set, get) => ({
  walletAddress: "",
  minerName: "",
  minerLicense: "",
  nameLicense: "",
  isConfigured: false,

  setWalletAddress: (address) => set({ walletAddress: address }),
  setMinerName: (name) => set({ minerName: name }),
  setMinerLicense: (license) => set({ minerLicense: license }),
  setNameLicense: (namelicense) => set({ nameLicense: namelicense }),


  saveMinerConfig: async () => {
    const { minerLicense, minerName, walletAddress, nameLicense } = get();
    if (!walletAddress || !minerLicense || !minerName || !nameLicense) {
        ToastAndroid.show("Please fill in all fields!", ToastAndroid.SHORT);
        return;
      }
    try {
      await AsdApi.minerConfig(minerLicense, nameLicense);
      const minerData = { walletAddress, minerLicense, minerName, nameLicense, isConfigured: true };
      console.log("Saving miner config:", minerData);
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

import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from 'expo-device';
import AsdMiningRN from "asd-mining";
// console.log(Device)

interface MinerState {
  id: number | string
  walletAddress: string;
  minerName: string;
  minerLicense: string;
  hashRate:number | string ,
  isConfigured: boolean;
  isCalculating: boolean;
  setId: (id: number | string) => void;
  setWalletAddress: (address: string) => void;
  setMinerName: (name: string) => void;
  setMinerLicense: (license: string) => void;
  saveMinerConfig: () => Promise<void>;
  loadMinerConfig: () => Promise<void>;
  setIsCalculating: (status: boolean) => void;
}

export const useMinerStore = create<MinerState>((set, get) => ({
  id: '',
  walletAddress: "",
  minerName: "",
  minerLicense: "",
  nameLicense: "",
  hashRate: "",
  isCalculating: false,
  isConfigured: false,

  setId: (id) => set({ id }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setMinerName: (name) => set({ minerName: name }),
  setMinerLicense: (license) => set({ minerLicense: license }),
  setIsCalculating: (status) => set({ isCalculating: status }),

  saveMinerConfig: async () => {
    const { walletAddress, minerLicense, minerName } = get();
    if (!walletAddress) {
      ToastAndroid.show("Please enter your wallet address!", ToastAndroid.SHORT);
      return;
    }
    try {
      if (!minerLicense || !minerName) {
        await AsdApi.updateWallte(walletAddress);
        await AsyncStorage.setItem("walletAddress", JSON.stringify({ walletAddress }));
        set({ isConfigured: false });
        ToastAndroid.show("Wallet updated successfully!", ToastAndroid.SHORT);
        return;
      }
      set({ isCalculating: true });
      // Tính hashRate bằng AsdMiningRN
      const minerInstance = AsdMiningRN.getInstance(minerLicense, "https://be.asdscan.ai");
      const hashRateMiner = await minerInstance.calculateHashRate(5000);
      const hashRate = Math.round(hashRateMiner);
      console.log(hashRate, "hashRate")
      // Cập nhật state khi tính xong
      set({ isCalculating: false, hashRate });

      const memory = Device.totalMemory ? Math.ceil(Device.totalMemory / (1024 * 1024 * 1024)) : 4;
      const data = {
        name: minerName,
        license: minerLicense,
        cpu: 4,
        memory,
        device: "mobile",
        hashRate
      };
      const response = await AsdApi.minerConfig(data);
      const minerId = response?.id
      // console.log(response?.id, "id")
      const minerData = { walletAddress, minerLicense, minerName, isConfigured: true, id: response?.id,hashRate };
      await AsyncStorage.setItem("minerConfig", JSON.stringify(minerData));
      console.log(minerData, "minerData")
      set({ isConfigured: true ,id: minerId});
      ToastAndroid.show("Miner configuration saved successfully!", ToastAndroid.SHORT);
    } catch (err: any) {
      console.error("Error saving miner config:", err);
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  },
  
  loadMinerConfig: async () => {
    try {
      const savedConfig = await AsyncStorage.getItem("minerConfig");
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        // console.log("Loaded miner config:", parsedConfig);
        set(parsedConfig);
      }
    } catch (err) {
      console.error("Error loading miner config:", err);
    }
  },
}));

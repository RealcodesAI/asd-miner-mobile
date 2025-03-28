import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../utils/toastService";
import * as SecureStore from "expo-secure-store";

interface Chart {
  minerId: number;
  interval: string;
  data: {
    timeInterval: string;
    totalHashRate: number | string;
    totalReward: number | string;
  }[];
}

interface ChartState {
  chart: Chart | null;
  getChart: () => Promise<void>;
}

export const getChartStore = create<ChartState>((set) => ({
  chart: null,

  getChart: async () => {
    try {
      const data = await SecureStore.getItemAsync("minerConfig");
      const parsedData = data ? JSON.parse(data) : null;
      const response = await AsdApi.getDataChart(parsedData?.id);
      set({ chart: response });
      //   console.log(response,'response')
    } catch (err: any) {
      console.log("Error fetching user:", err);
      showToast("Error no license, please enter license", "danger");
    }
  },
}));

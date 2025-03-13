import { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { AsdApi } from "@/lib/api/service/asdApi";

export const useMinerReward = () => {
  const [reward, setReward] = useState(0);

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const response = await AsdApi.getMiner(5);
        setReward(Number((response.reward).toFixed(4)));
      } catch (error: any) {
        ToastAndroid.show(`Failed to fetch rewards: ${error.message}`, ToastAndroid.SHORT);
        console.error("Failed to fetch rewards:", error);
      }
    };

    fetchReward();
  }, []);

  return reward;
};

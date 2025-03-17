import { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { AsdApi } from "@/lib/api/service/asdApi";
import {useMinerId} from "@/hooks/useMinerId";

export const useMinerReward = () => {
  const [reward, setReward] = useState(0);
  const minerId = useMinerId();
  useEffect(() => {
    const fetchReward = async () => {
      try {
        if(!minerId) return;
        const response = await AsdApi.getMiner(Number(minerId));
        setReward(Number((response.reward).toFixed(4)));
      } catch (error: any) {
        ToastAndroid.show(`Failed to fetch rewards: ${error.message}`, ToastAndroid.SHORT);
        console.error("Failed to fetch rewards:", error);
      }
    };

    fetchReward();
  }, [minerId]);

  return reward;
};

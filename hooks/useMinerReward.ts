import { useState, useEffect } from "react";
import { AsdApi } from "@/lib/api/service/asdApi";
import {useMinerId} from "@/hooks/useMinerId";
import showToast from "@/lib/utils/toastService";

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
        showToast(`Failed to fetch rewards: ${error.message}`,"danger")
        console.error("Failed to fetch rewards:", error);
      }
    };

    fetchReward();
  }, [minerId]);

  return reward;
};

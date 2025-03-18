import { useState, useEffect } from "react";
import { AsdApi } from "@/lib/api/service/asdApi";
import {useMinerId} from "@/hooks/useMinerId";
import showToast from "@/lib/utils/toastService";
import {useMinerStore} from "@/lib/zustand/miner";

export const useMinerReward = () => {
  const [reward, setReward] = useState(0);
  const {id} = useMinerStore();
  useEffect(() => {
    const fetchReward = async () => {
        if(!id) return;
        const response = await AsdApi.getMiner(Number(id));
        setReward(Number((response.reward).toFixed(4)));
    };

    fetchReward();
    const interval = setInterval(fetchReward, 30000); // 60 giây

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, [id]);

  return reward;
};

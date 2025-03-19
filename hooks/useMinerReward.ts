import { useState, useEffect } from "react";
import { AsdApi } from "@/lib/api/service/asdApi";
import {useMinerId} from "@/hooks/useMinerId";
import showToast from "@/lib/utils/toastService";
import {useMinerStore} from "@/lib/zustand/miner";
import {useQuery} from "@tanstack/react-query";

export const useMinerReward = () => {
  const {id} = useMinerStore();
  const {data: hashRate} = useQuery({
    queryKey: ["pAsdApi.getMiner", id],
    queryFn: async ({queryKey}) => await AsdApi.getMiner(Number(queryKey[1])),
    enabled: !!id,
    refetchInterval: 10000,
  });
  return hashRate?.reward;
};

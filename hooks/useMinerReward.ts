import { AsdApi } from "@/lib/api/service/asdApi";
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

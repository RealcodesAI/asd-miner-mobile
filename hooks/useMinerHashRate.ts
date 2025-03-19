import {useMinerStore} from "@/lib/zustand/miner";
import {AsdApi} from "@/lib/api/service/asdApi";
import {useQuery} from "@tanstack/react-query";

export const useMinerHashRate = () => {
  const {id} = useMinerStore();
  const {data: hashRate} = useQuery({
    queryKey: ["pAsdApi.getMiner", id],
    queryFn: async ({queryKey}) => await AsdApi.getMiner(Number(queryKey[1])),
    enabled: !!id,
    refetchInterval: 10000, // Cập nhật mỗi 10 giây
  });
  return hashRate?.hashRate;
}

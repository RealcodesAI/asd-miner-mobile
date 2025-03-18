import {useState, useEffect} from "react";
import {useMinerStore} from "@/lib/zustand/miner";
import {AsdApi} from "@/lib/api/service/asdApi";

export const useMinerHashRate = () => {
  const [minerHashRate, setMinerHashRate] = useState<number | null>(null);
  const {id} = useMinerStore();

  useEffect(() => {
    const fetchMinerLicense = async () => {
      if (!id) return; // Đảm bảo id hợp lệ trước khi gọi API
      const storedData = await AsdApi.getMiner(Number(id));
      if (storedData) {
        setMinerHashRate(storedData.hashRate || null);
      }

    };

    // Gọi API ngay lập tức khi component mount
    fetchMinerLicense();

    // Thiết lập interval để gọi API mỗi phút
    const interval = setInterval(fetchMinerLicense, 30000); // 60 giây

    // Cleanup interval khi component unmount
    return () => clearInterval(interval);
  }, [id]); // Dependency array chứa id để refetch khi id thay đổi

  return minerHashRate;
};

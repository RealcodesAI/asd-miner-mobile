import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useMinerId} from "@/hooks/useMinerId";
import {AsdApi} from "@/lib/api/service/asdApi";
import {ToastAndroid} from "react-native";

export const useMinerHashRate = () => {
  const [minerHashRate, setMinerHashRate] = useState<string | null>(null);
const minerId = useMinerId();
  useEffect(() => {
    if (!minerId) return ToastAndroid.show("Lỗi khi lấy dữ liệu thợ đào!", ToastAndroid.SHORT);
    const fetchMinerLicense = async () => {
      try {
      const data =  AsdApi.getMiner(Number(minerId));
      } catch (error) {
        console.error("Lỗi khi lấy minerLicense:", error);
      }
    };

    fetchMinerLicense();
  }, []);

  return minerHashRate;
};

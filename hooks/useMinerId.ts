import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "@/lib/utils/toastService";

export const useMinerId = () => {
  const [minerId, setMinerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMinerLicense = async () => {
      try {
        const storedData = await AsyncStorage.getItem("minerConfig");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setMinerId(parsedData.id || null);
        }
      } catch (err: any) {
        console.error("Lỗi khi lấy minerLicense:", err);
        showToast(`Lỗi khi lấy minerLicense:${err.message}`, "danger")
      }
    };

    fetchMinerLicense();
  }, []);

  return minerId;
};

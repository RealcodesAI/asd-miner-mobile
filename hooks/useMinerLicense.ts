import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "@/lib/utils/toastService";

export const useMinerLicense = () => {
  const [minerLicense, setMinerLicense] = useState<string | null>(null);

  useEffect(() => {
    const fetchMinerLicense = async () => {
      try {
        const storedData = await AsyncStorage.getItem("minerConfig");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setMinerLicense(parsedData.minerLicense || null);
        }
      } catch (err: any) {
        console.log("Lỗi khi lấy minerLicense:", err);
        showToast(`Lỗi khi lấy minerLicense:${err.message}`, "danger")
      }
    };

    fetchMinerLicense();
  }, []);

  return minerLicense;
};

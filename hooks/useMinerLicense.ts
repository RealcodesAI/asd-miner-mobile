import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      } catch (error) {
        console.error("Lỗi khi lấy minerLicense:", error);
      }
    };

    fetchMinerLicense();
  }, []);

  return minerLicense;
};

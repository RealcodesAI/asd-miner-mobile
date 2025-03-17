import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      } catch (error) {
        console.error("Lỗi khi lấy minerLicense:", error);
      }
    };

    fetchMinerLicense();
  }, []);

  return minerId;
};

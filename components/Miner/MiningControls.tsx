import React, { useState, useEffect } from "react";
import {TouchableOpacity, Text, ToastAndroid, TextStyle} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesMiner } from "@/app/(tabs)/styles/StylesMiner";

const MiningControls = ({ isMining, toggleMining } : any) => {
  const [minerLicense, setMinerLicense] = useState(null);
  useEffect(() => {
    const getMinerLicense = async () => {
      try {
        const storedData = await AsyncStorage.getItem("minerConfig");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setMinerLicense(parsedData.minerLicense);
        }
      } catch (error) {
        console.error("Lỗi khi lấy minerLicense:", error);
      }
    };


    getMinerLicense();
  }, []);

  const handlePress = async () => {
    if (minerLicense) {
      toggleMining();
    } else {
      ToastAndroid.show("Please configure minerLicense first!", ToastAndroid.SHORT);
    }
  };

  return (
    <TouchableOpacity
      style={[
        stylesMiner.startButton,
        isMining && stylesMiner.stopButton,
      ]}
      onPress={handlePress}
    >
      <Text style={stylesMiner.startButtonText as TextStyle}>
        {isMining ? "Stop mining" : "Start mining"}
      </Text>
    </TouchableOpacity>
  );
};

export default MiningControls;
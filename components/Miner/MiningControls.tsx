import React, { useState, useEffect } from "react";
import {TouchableOpacity, Text, ToastAndroid, TextStyle} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesMiner } from "@/app/(tabs)/styles/StylesMiner";
import AsdMiningRN from "asd-mining-rn";

const MiningControls = ({ isMining, toggleMining } : any) => {
  const [minerLicense, setMinerLicense] = useState(null);
  const [hashRate, setHashRate] = useState(0)
  const miner = new AsdMiningRN('784f49cc5411df749e542ae938cb59e66bc0000019ce102474ee5fd82bc0dd30', 'https://be.asdscan.ai');
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

    console.log('hashRate', hashRate)

    getMinerLicense();
  }, [hashRate]);

  const handlePress = async () => {
    if (minerLicense) {
      toggleMining();
      const hashRate = await miner.calculateHashRate(5000)
      setHashRate(hashRate)
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

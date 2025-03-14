import React from "react";
import {TouchableOpacity, Text, ToastAndroid, TextStyle} from "react-native";
import { stylesMiner } from "@/app/(tabs)/styles/StylesMiner";
import {useMinerLicense} from "@/hooks/useMinerLicense";
import { router } from "expo-router";

const MiningControls = ({ isMining, toggleMining } : any) => {
  const minerLicense = useMinerLicense();
  console.log(minerLicense)
  const handlePress = async () => {
    if (minerLicense) {
      toggleMining();
    } else {
      ToastAndroid.show("Please configure minerLicense first!", ToastAndroid.SHORT);
      router.push("/(tabs)/Config");
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
import React from "react";
import {TouchableOpacity, Text, TextStyle} from "react-native";
import {useMinerLicense} from "@/hooks/useMinerLicense";
import { router } from "expo-router";
import { stylesMiner } from "@/app/css/styles/StylesMiner";
import showToast from "@/lib/utils/toastService";

const MiningControls = ({ isMining, toggleMining } : any) => {
  const minerLicense = useMinerLicense();
  const handlePress = async () => {
    if (minerLicense) {
      toggleMining();
    } else {
      showToast("Please configure minerLicense first!",'warning');
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
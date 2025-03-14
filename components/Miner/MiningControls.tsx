import React, { useState, useEffect } from "react";
import {TouchableOpacity, Text, ToastAndroid, TextStyle} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesMiner } from "@/app/(tabs)/styles/StylesMiner";
import {useMinerLicense} from "@/hooks/useMinerLicense";

const MiningControls = ({ isMining, toggleMining } : any) => {
  const minerLicense = useMinerLicense();
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
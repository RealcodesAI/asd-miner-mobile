import React from "react";
import {TouchableOpacity, Text, ToastAndroid, TextStyle} from "react-native";
import {useMinerLicense} from "@/hooks/useMinerLicense";
import {router} from "expo-router";
import {stylesMiner} from "@/app/css/styles/StylesMiner";
import {useMinerStore} from "@/lib/zustand/miner";

const MiningControls = ({isMining, toggleMining}: any) => {
  const {id} = useMinerStore();
  const handlePress = async () => {
    if (id) {
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
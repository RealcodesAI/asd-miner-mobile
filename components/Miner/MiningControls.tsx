import React from "react";
import { TouchableOpacity, Text, TextStyle, View } from "react-native";
import { useMinerStore } from "@/lib/zustand/miner";
import { router } from "expo-router";
import { stylesMiner } from "@/app/css/styles/StylesMiner";
import showToast from "@/lib/utils/toastService";
import { Ionicons } from "@expo/vector-icons";

const MiningControls = ({ isMining, toggleMining }: any) => {
  const { id } = useMinerStore();
  const handlePress = async () => {
    if (id) {
      toggleMining();
    } else {
      showToast("Please configure minerLicense first!", "warning");
      router.push("/(tabs)/Config");
    }
  };

  return (
    <TouchableOpacity
      style={[stylesMiner.startButton, isMining && stylesMiner.stopButton]}
      onPress={handlePress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name={isMining ? "pause-sharp" : "play-sharp"}
          size={20}
          color="#fff"
          style={{ marginRight: 5 }}
        />
        <Text style={stylesMiner.startButtonText as TextStyle}>
          {isMining ? "Stop mining" : "Start mining"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MiningControls;

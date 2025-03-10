import { View, Text } from "react-native";
import React from "react";
import { stylesHistory } from "@/app/(tabs)/styles/StylesHistory";

const MinerHistory = () => {
  return (
    <View style={stylesHistory.minerHistory}>
      <Text style={stylesHistory.minerTitle}>Miner History</Text>
      <View style={stylesHistory.rewardBox}>
        <View style={{ height: 40, paddingHorizontal: 10 }}>
          <Text style={stylesHistory.rewardText}>
            Current Reward: 100.123 ASD
          </Text>
          <Text style={stylesHistory.nextReward}>
            899.877 more to next withdraw
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MinerHistory;

import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { getUserStore } from "@/lib/zustand/getUser";
import { useMinerReward } from "@/hooks/useMinerReward";
import { stylesHistory } from "@/app/css/styles/StylesHistory";

const MinerHistory = () => {
  const reward = useMinerReward();
  const { userWallet, getUserWallet } = getUserStore();

  useEffect(() => {
    getUserWallet();
  }, []);
  return (
    <View style={stylesHistory.card}>
      <Text style={stylesHistory.sectionLabel}>Current Balance</Text>
      <Text style={stylesHistory.balanceAmount}>{reward?.toFixed(4)} ASD</Text>
      <Text style={stylesHistory.subLabel}>Progress to next withdrawal</Text>
      <View style={stylesHistory.progressBarContainer}>
        <View style={[stylesHistory.progressBar, { width: "10%" }]} />
      </View>
      <Text style={stylesHistory.progressText}>
        {reward?.toFixed(4)} / {userWallet?.rewardThreshold} ASD
      </Text>
    </View>
  );
};

export default MinerHistory;

import {View, Text} from "react-native";
import React, {useEffect} from "react";
import {getUserStore} from "@/lib/zustand/getUser";
import {useMinerReward} from "@/hooks/useMinerReward";
import { stylesHistory } from "@/app/css/styles/StylesHistory";

const MinerHistory = () => {
  const reward = useMinerReward();
  const { user, getMe } = getUserStore();

  useEffect(() => {
    getMe();
  }, []);
  return (
    <View style={stylesHistory.minerHistory}>
      <Text style={stylesHistory.minerTitle}>Miner History</Text>
      <View style={stylesHistory.rewardBox}>
        <View style={{ height: 40, paddingHorizontal: 10 }}>
          <Text style={stylesHistory.rewardText}>
            Current Reward: {(reward)?.toFixed(4)} ASD
          </Text>
          <Text style={stylesHistory.nextReward}>
            {user?.rewardThreshold && user?.rewardThreshold - (reward || 0) > 0
              ? `${(user?.rewardThreshold - (reward || 0)).toFixed(4)} more to next withdraw`
              : "You can withdraw now"}
            </Text>
        </View>
      </View>
    </View>
  );
};

export default MinerHistory;

import {View, Text, ToastAndroid} from "react-native";
import React, {useEffect, useState} from "react";
import { stylesHistory } from "@/app/(tabs)/styles/StylesHistory";
import {AsdApi} from "@/lib/api/service/asdApi";
import {getUserStore} from "@/lib/zustand/getUser";

const MinerHistory = () => {
  const [reward, setReward] = useState(0);
  useEffect(() => {
    const response = async () => {
      try {
        const response = await AsdApi.getMiner(5);
        setReward(Number((response.reward).toFixed(4)));
      } catch (error: any) {
        ToastAndroid.show(`Failed to fetch rewards: ${error.message}`, ToastAndroid.SHORT);
        console.error("Failed to fetch rewards:", error);
      }
    }
    response();
  }, []);

  const {user,getMe } = getUserStore()
  useEffect(() => {
    getMe()
  },[])
  return (
    <View style={stylesHistory.minerHistory}>
      <Text style={stylesHistory.minerTitle}>Miner History</Text>
      <View style={stylesHistory.rewardBox}>
        <View style={{ height: 40, paddingHorizontal: 10 }}>
          <Text style={stylesHistory.rewardText}>
            Current Reward: {reward} ASD
          </Text>
          <Text style={stylesHistory.nextReward}>
            {user?.rewardThreshold - reward > 0
              ? `${(user?.rewardThreshold - reward).toFixed(4)} more to next withdraw`
              : "You can withdraw now"}
            </Text>
        </View>
      </View>
    </View>
  );
};

export default MinerHistory;

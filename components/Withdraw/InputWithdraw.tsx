
import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useMinerReward } from "@/hooks/useMinerReward";
import { getUserStore } from "@/lib/zustand/getUser";
import { useWithdrawHistories } from "@/lib/zustand/useWithdrawHistories";
import { stylesWithdraw } from "@/app/css/styles/StylesWithdraw";

const WithdrawScreen = () => {
  const reward = useMinerReward();
  const { user, getMe } = getUserStore();
  const { threshold, setThreshold, updateRewardThreshold } =
    useWithdrawHistories();
    useEffect(() => {
      const fetchData = async () => {
        await getMe();
        if (user?.rewardThreshold) {
          setThreshold(user.rewardThreshold);
        }
      };
      fetchData();
    }, [user?.rewardThreshold]);
  return (
    <View style={{ marginHorizontal: 20 }}>
      <Text style={stylesWithdraw.withdrawText}>Withdraw your reward</Text>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={stylesWithdraw.withdrawLabel}>Current Reward</Text>
        <Text style={stylesWithdraw.withdrawValue}>
          {(reward || 0).toFixed(4)} ASD
        </Text>
      </View>

      <View style={stylesWithdraw.withdrawSection}>
        <Text style={stylesWithdraw.thresholdLabel}>Withdraw threshold</Text>

        <View style={stylesWithdraw.inputContainer}>
          <TextInput
            style={stylesWithdraw.input}
            placeholder="Enter amount"
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric" 
            onChangeText={(text) => setThreshold(Number(text) || 0)}
            value={threshold ? String(threshold) : ""}
          />
          <TouchableOpacity style={stylesWithdraw.withdrawButton} onPress={updateRewardThreshold}>
            <Text style={stylesWithdraw.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>

        <Text style={stylesWithdraw.infoText}>
          {user?.rewardThreshold && user?.rewardThreshold - (reward || 0) > 0
            ? `${(user?.rewardThreshold - (reward || 0)).toFixed(
                4
              )} more to next withdraw`
            : "You can withdraw now"}
        </Text>
      </View>
    </View>
  );
};

export default WithdrawScreen;

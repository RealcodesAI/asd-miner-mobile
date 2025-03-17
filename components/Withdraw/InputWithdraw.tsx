import { stylesWithdraw } from "@/app/(tabs)/styles/StylesWithdraw";
import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import {useMinerReward} from "@/hooks/useMinerReward";
import { getUserStore } from "@/lib/zustand/getUser";

const WithdrawScreen = () => {
  const reward = useMinerReward();
    const { user, getMe } = getUserStore();
  
    useEffect(() => {
      getMe();
    }, []);
  return (
    <View style={{marginHorizontal: 20}}>
      <Text style={stylesWithdraw.withdrawText}>Withdraw your reward</Text>
      
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={stylesWithdraw.withdrawLabel}>Current Reward</Text>
        <Text style={stylesWithdraw.withdrawValue}>{(reward).toFixed(4)} ASD</Text>
      </View>

      <View style={stylesWithdraw.withdrawSection}>
        <Text style={stylesWithdraw.thresholdLabel}>Withdraw threshold</Text>

        <View style={stylesWithdraw.inputContainer}>
          <TextInput style={stylesWithdraw.input} placeholder="Enter amount" placeholderTextColor="#A0A0A0" />
          <TouchableOpacity style={stylesWithdraw.withdrawButton}>
            <Text style={stylesWithdraw.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <Text style={stylesWithdraw.infoText}>
        {user?.rewardThreshold && user?.rewardThreshold - reward > 0
              ? `${(user?.rewardThreshold - reward).toFixed(4)} more to next withdraw`
              : "You can withdraw now"}
        </Text>
      </View>
    </View>
  );
};

export default WithdrawScreen;

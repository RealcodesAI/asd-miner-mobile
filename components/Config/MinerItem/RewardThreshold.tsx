import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect } from "react";
import { stylesConfig } from "@/app/css/styles/StylesConfig";
import { getUserStore } from "@/lib/zustand/getUser";

interface Prosp {
  threshold: number;
  setThreshold: (threshold: number) => void;
}
const RewardThreshold = ({threshold,setThreshold}: Prosp) => {
    const { userWallet, getUserWallet } = getUserStore();
      useEffect(() => {
        const fetchData = async () => {
          await getUserWallet();
          if (userWallet?.rewardThreshold) {
            setThreshold(userWallet.rewardThreshold);
          }
        };
        fetchData();
      }, [userWallet?.rewardThreshold]);
  return (
    <View style={stylesConfig.card}>
      <View style={stylesConfig.containerImage}>
        <Image
          source={require("../../../assets/icon/wallet.png")}
          style={stylesConfig.image}
          resizeMode="contain"
        />
        <Text style={[stylesConfig.cardTitle, { lineHeight: 20 }]}>
          Reward Threshold
        </Text>
      </View>

      <Text style={stylesConfig.warningText}>
        Set the minimum amount required before automatic withdrawal
      </Text>

      <Text style={stylesConfig.label}>Minimum Withdrawal (ASD)</Text>
      <TextInput
        style={[stylesConfig.input]}
        value={threshold ? String(threshold) : ""}
        onChangeText={(text) => setThreshold(Number(text) || 0)}
      />
      <Text style={stylesConfig.hintText}>
        Rewards will be automatically sent to your wallet when they exceed this
        amount
      </Text>
    </View>
  );
};

export default RewardThreshold;

import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { stylesConfig } from "@/app/css/styles/StylesConfig";

const RewardThreshold = () => {
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
        // value={maskText(walletAddress)}
        // onChangeText={setWalletAddress}
      />
      <Text style={stylesConfig.hintText}>
        Rewards will be automatically sent to your wallet when they exceed this
        amount
      </Text>
    </View>
  );
};

export default RewardThreshold;

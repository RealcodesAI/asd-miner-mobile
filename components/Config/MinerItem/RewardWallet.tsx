import { View, Text, Image } from "react-native";
import React from "react";
import { stylesConfig } from "@/app/css/styles/StylesConfig";
import { TextInput } from "react-native-gesture-handler";

interface Prpos {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  maskText: (text: string) => string;
}
const RewardWallet = ({ walletAddress, setWalletAddress, maskText }: Prpos) => {
  return (
    <View style={stylesConfig.card}>
      <View style={stylesConfig.containerImage}>
        <Image
          source={require("../../../assets/icon/wallet.png")}
          style={stylesConfig.image}
          resizeMode="contain"
        />
        <Text style={[stylesConfig.cardTitle, { lineHeight: 20 }]}>
          Reward Wallet
        </Text>
      </View>

      <Text style={stylesConfig.warningText}>
        Configure where your mining rewards will be sent
      </Text>

      <Text style={stylesConfig.label}>Wallet Address</Text>
      <TextInput
        style={[stylesConfig.input]}
        value={maskText(walletAddress)}
        onChangeText={setWalletAddress}
        editable={!walletAddress}
      />
    </View>
  );
};

export default RewardWallet;

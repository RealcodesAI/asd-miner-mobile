import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { stylesConfig } from "@/app/css/styles/StylesConfig";
import { TextInput } from "react-native-gesture-handler";

interface Prpos {
  minerLicense: string;
  setMinerLicense: (license: string) => void;
  maskText: (text: string) => string;
}
const MinerLicense = ({ minerLicense, setMinerLicense, maskText }: Prpos) => {
  return (
    <View style={stylesConfig.card}>
      <View style={stylesConfig.containerImage}>
        <Image
          source={require("../../../assets/icon/Key.png")}
          style={stylesConfig.image}
          resizeMode="contain"
        />
        <Text style={[stylesConfig.cardTitle, { lineHeight: 20 }]}>
          Miner License
        </Text>
      </View>

      <Text style={stylesConfig.warningText}>
        Enter your miner license key to activate mining capabilities
      </Text>

      <Text style={stylesConfig.label}>License Key</Text>
      <TextInput
        style={stylesConfig.input}
        value={maskText(minerLicense)}
        onChangeText={setMinerLicense}
      />
      <TouchableOpacity style={stylesConfig.Button}>
        <Text style={stylesConfig.ButtonText}>Validate License</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MinerLicense;

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { stylesConfig } from "@/app/css/styles/StylesConfig";
import { TextInput } from "react-native-gesture-handler";

interface Prpos {
  minerName: string;
  setMinerName: (name: string) => void;
}
const MinerName = ({ minerName, setMinerName }: Prpos) => {
  return (
    <View style={stylesConfig.card}>
      <View style={stylesConfig.containerImage}>
        <Image
          source={require("../../../assets/icon/Key.png")}
          style={stylesConfig.image}
          resizeMode="contain"
        />
        <Text style={[stylesConfig.cardTitle, { lineHeight: 20 }]}>
          Miner Name
        </Text>
      </View>

      <Text style={stylesConfig.warningText}>
        Enter your miner license name to activate mining capabilities
      </Text>

      <Text style={stylesConfig.label}>License Name</Text>
      <TextInput
        style={stylesConfig.input}
        value={minerName}
        onChangeText={setMinerName}
      />
    </View>
  );
};

export default MinerName;

import { View, Text, Image } from "react-native";
import React from "react";
import { stylesConfig } from "@/app/css/styles/StylesConfig";
import { TextInput } from "react-native-gesture-handler";

const MiningPool = () => {
  return (
    <View style={stylesConfig.card}>
      <View style={stylesConfig.containerImage}>
        <Image
          source={require("../../../assets/icon/wallet.png")}
          style={stylesConfig.image}
          resizeMode="contain"
        />
        <Text style={[stylesConfig.cardTitle, { lineHeight: 20 }]}>
          Mining Pool
        </Text>
      </View>

      <Text style={stylesConfig.warningText}>
        Select your preferred mining pool
      </Text>

      <Text style={stylesConfig.label}>Pool Name</Text>
      <TextInput style={[stylesConfig.input]} />
      <Text style={stylesConfig.hintText}>
        The default pool is recommended for optimal performance
      </Text>
    </View>
  );
};

export default MiningPool;

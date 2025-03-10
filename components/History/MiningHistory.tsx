import { View, Text, Image } from "react-native";
import React from "react";
import { stylesHistory } from "@/app/(tabs)/styles/StylesHistory";

const MiningHistory = () => {
  return (
    <>
      <Text style={stylesHistory.historyTitle}>Mining history</Text>
      {[1, 2].map((_, index) => (
        <View key={index} style={stylesHistory.historyItem}>
          {/* Avatar */}
          <View style={stylesHistory.avatarContainer}>
            <Image
              source={require("../../assets/images/avatar/avatar.png")}
              style={stylesHistory.avatar}
            />
          </View>

          {/* Nội dung */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={stylesHistory.rowBetween}>
              <Text style={stylesHistory.amount}>0.123 ASD</Text>
              <Text style={stylesHistory.time}>12/02/2024 15:30</Text>
            </View>
            <Text style={stylesHistory.detail}>Block: 13,123</Text>
            <Text style={stylesHistory.detail}>Hashrate: 120.000 H/S</Text>
            <Text style={stylesHistory.detail}>Miner: Lilhuy01</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default MiningHistory;

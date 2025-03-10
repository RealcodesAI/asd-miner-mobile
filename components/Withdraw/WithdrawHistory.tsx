import { View, Text, Image } from "react-native";
import React from "react";
import { stylesWithdraw } from "@/app/(tabs)/styles/StylesWithdraw";

const WithdrawHistory = () => {
  return (
    <>
      <Text style={stylesWithdraw.historyTitle}>Mining history</Text>
      {[1,2,3,].map((_, index) => (
        <View key={index} style={stylesWithdraw.historyItem}>
          {/* Avatar */}
          <View style={stylesWithdraw.avatarContainer}>
            <Image
              source={require("../../assets/images/avatar/image 173.png")}
              style={stylesWithdraw.avatar}
            />
          </View>

          {/* Nội dung */}
          <View style={{ flex: 1, marginLeft: 15 }}>
            <View style={stylesWithdraw.rowBetween}>
              <Text style={stylesWithdraw.amount}>0.123 ASD</Text>
              <Text style={stylesWithdraw.time}>12/02/2024 15:30</Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={stylesWithdraw.detail}>Receipient: 0x1222.12212</Text>
              <Text style={stylesWithdraw.detail}>Miner: Lilhuy01</Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default WithdrawHistory;

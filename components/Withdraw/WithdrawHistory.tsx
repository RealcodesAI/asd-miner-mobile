import {View, Text, Image, ActivityIndicator} from "react-native";
import React, {useEffect} from "react";
import { stylesWithdraw } from "@/app/(tabs)/styles/StylesWithdraw";
import {useWithdrawHistories} from "@/lib/zustand/useWithdrawHistories";

const WithdrawHistory = () => {
  const { histories, isLoading, fetchWithdrawHistories } = useWithdrawHistories();
  const params = {
    page: 0,
    limit: 10,
  }
  useEffect(() => {
    fetchWithdrawHistories(params);
  }, []);
  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <>
      <Text style={stylesWithdraw.historyTitle}>Mining history</Text>
      {histories?.contents.map((item, index) => (
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
              <Text style={stylesWithdraw.amount}>{item.amount} ASD</Text>
              <Text style={stylesWithdraw.time}>  {new Date(item.createdAt).toLocaleString("vi-VN")}  </Text>
            </View>
            <View style={{marginTop: 7}}>
              <Text style={stylesWithdraw.detail}>Receipient: {item.recipient}</Text>
              <Text style={stylesWithdraw.detail}>Miner: Lilhuy01</Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default WithdrawHistory;

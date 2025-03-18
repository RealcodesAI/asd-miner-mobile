import {View, Text, Image, ActivityIndicator, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {useWithdrawHistories} from "@/lib/zustand/useWithdrawHistories";
// Import the refresh icon
import { Ionicons } from '@expo/vector-icons';
import {useMinerName} from "@/hooks/useMinerName";
import { stylesWithdraw } from "@/app/css/styles/StylesWithdraw";

const WithdrawHistory = () => {
  const { histories, isLoading, fetchWithdrawHistories } = useWithdrawHistories();
  const [page, setPage] = useState(0);
  const limit = 10;
  const minerName = useMinerName()

  const loadHistories = () => {
    const params = {
      page: page,
      limit: limit,
    };
    fetchWithdrawHistories(params);
  };

  useEffect(() => {
    loadHistories();
  }, [page]);

  const handleRefresh = () => {
    setPage(0);
    loadHistories();
  };

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <>
      <View style={stylesWithdraw.headerContainer}>
        <Text style={stylesWithdraw.historyTitle}>Withdraw history</Text>
        <TouchableOpacity onPress={handleRefresh} style={stylesWithdraw.refreshButton}>
          <Ionicons name="refresh" size={24} color="#333" />
        </TouchableOpacity>
      </View>

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
              <Text style={stylesWithdraw.detail}>Miner: {minerName}</Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default WithdrawHistory;
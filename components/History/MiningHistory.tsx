import {View, Text, Image, ActivityIndicator, TouchableOpacity, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {useRewards} from "@/lib/zustand/useRewards";
// Import the refresh icon
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRewards } from "@/lib/zustand/useRewards";
import { Ionicons } from "@expo/vector-icons";
import { stylesHistory } from "@/app/css/styles/StylesHistory";
import { useMinerStore } from "@/lib/zustand/miner";

const MiningHistory = ({ loadMore } : any) => {
  const { rewards, isLoading, fetchRewards } = useRewards();
  const [limit, setLimit] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const { id, minerName } = useMinerStore();
  const prevLoadMore = useRef(loadMore);

  useEffect(() => {
    loadRewards();
  }, [limit, id]);

  // Phát hiện khi nào loadMore thay đổi từ false -> true
  useEffect(() => {
    if (loadMore && !prevLoadMore.current && !loadingMore && rewards?.contents && rewards?.contents?.length < rewards?.total) {
      setLimit(prev => prev + 10);
    }
    prevLoadMore.current = loadMore;
  }, [loadMore]);

  const loadRewards = async () => {
    if (id) {
      const params = { limit };
      setLoadingMore(true);
      await fetchRewards(params, id);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setLimit(10);
    loadRewards();
  };

  if (isLoading && limit === 10) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={stylesHistory.headerContainer}>
        <Text style={stylesHistory.historyTitle}>Mining history</Text>
        <TouchableOpacity onPress={handleRefresh} style={stylesHistory.refreshButton}>
          <Ionicons name="refresh" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Danh sách lịch sử */}
      {rewards?.contents?.map((item, index) => (
        <View key={index} style={stylesHistory.historyItem}>
          {/* Avatar */}
          <View style={stylesHistory.avatarContainer}>
            <Image source={require("../../assets/images/avatar/image 173.png")} style={stylesHistory.avatar} />
          </View>
          {/* Content */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={stylesHistory.rowBetween}>
              <Text style={stylesHistory.amount}>{parseFloat(item.reward).toFixed(4)} ASD</Text>
              <Text style={stylesHistory.time}>{new Date(item.createdAt).toLocaleString("vi-VN")}</Text>
            </View>
            <Text style={stylesHistory.detail}>Hashrate: {item.hashRate} H/S</Text>
            <Text style={stylesHistory.detail}>Miner: {minerName}</Text>
          </View>
        </View>
      ))}

      {/* Loading indicator */}
      {loadingMore && (
        <View style={{ alignItems: 'center', padding: 10 }}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default MiningHistory;
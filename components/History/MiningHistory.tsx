import {View, Text, Image, ActivityIndicator, TouchableOpacity, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {useRewards} from "@/lib/zustand/useRewards";
// Import the refresh icon
import { Ionicons } from '@expo/vector-icons';
import {useMinerId} from "@/hooks/useMinerId";
import {useMinerName} from "@/hooks/useMinerName";
import { stylesHistory } from "@/app/css/styles/StylesHistory";

const MiningHistory = () => {
  const { rewards, isLoading, fetchRewards } = useRewards();
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;
  const totalPages = Number(rewards?.total) / limit;
  const minerId = useMinerId();
  const minerName = useMinerName();
  useEffect(() => {
    loadRewards();
  }, [currentPage, minerId]);

  const loadRewards = () => {
    if(minerId) {
      const params = {
        page: currentPage,
        limit: limit,
      };
      fetchRewards(params, minerId);
    }
  };

  const handleRefresh = () => {
    // Reset to first page and reload data
    setCurrentPage(0);
    loadRewards();
  };

  const handleNextPage = () => {
    if (totalPages && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <>
      <View style={stylesHistory.headerContainer}>
        <Text style={stylesHistory.historyTitle}>Mining history</Text>
        <TouchableOpacity onPress={handleRefresh} style={stylesHistory.refreshButton}>
          <Ionicons name="refresh" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {rewards?.contents.map((item, index) => (
        <View key={index} style={stylesHistory.historyItem}>
          {/* Avatar */}
          <View style={stylesHistory.avatarContainer}>
            <Image
              source={require("../../assets/images/avatar/image 173.png")}
              style={stylesHistory.avatar}
            />
          </View>

          {/* Nội dung */}
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

      {/* Pagination Controls */}
      <View style={stylesHistory.paginationContainer}>
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 0}
          style={[stylesHistory.paginationButton, currentPage === 0 && stylesHistory.disabledButton]}
        >
          <Text style={stylesHistory.paginationButtonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={stylesHistory.pageIndicator}>
          Page {currentPage + 1} of {totalPages || 1}
        </Text>

        <TouchableOpacity
          onPress={handleNextPage}
          disabled={!totalPages || currentPage >= totalPages - 1}
          style={[stylesHistory.paginationButton, (!totalPages|| currentPage >= totalPages - 1) && stylesHistory.disabledButton]}
        >
          <Text style={stylesHistory.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MiningHistory;
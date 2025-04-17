import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRewards } from "@/lib/zustand/useRewards";
import { stylesHistory } from "@/app/css/styles/StylesHistory";
import { useMinerStore } from "@/lib/zustand/miner";
import { Ionicons } from "@expo/vector-icons";
import { useWithdrawHistories } from "@/lib/zustand/useWithdrawHistories";

const MiningHistory = ({ loadMore }: any) => {
  const { rewards, isLoading, fetchRewards } = useRewards();
  const { histories, fetchWithdrawHistories } = useWithdrawHistories();
  const [activeTab, setActiveTab] = useState("Rewards");
  const [limit, setLimit] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);
  const { id } = useMinerStore();
  const prevLoadMore = useRef(loadMore);

  useEffect(() => {
    loadData();
  }, [limit, id]);

  // Khi loadMore = true (trigger từ scroll hoặc thao tác nào đó)
  useEffect(() => {
    if (
      loadMore &&
      !prevLoadMore.current &&
      !loadingMore &&
      ((activeTab === "Rewards" &&
        rewards?.contents ) ||
        (activeTab === "Withdrawals" &&
          histories?.contents))
    ) {
      setLimit((prev) => prev + 5);
    }
    prevLoadMore.current = loadMore;
  }, [loadMore, activeTab]);

  const loadData = async () => {
    const params = { limit };
    if (id) {
      const params = { limit };
      setLoadingMore(true);
      if (activeTab === "Rewards") {
        await fetchRewards(params, id);
      } else {
        await fetchWithdrawHistories(params);
      }
      setLoadingMore(false);
    }
    await fetchWithdrawHistories(params);
    setLoadingMore(false);
  };

  const handleRefresh = () => {
    setLimit(5);
    loadData();
  };

  if (isLoading && limit === 5) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={stylesHistory.card}>
      <View style={stylesHistory.headerContainer}>
        <Text style={stylesHistory.sectionLabel}>History</Text>
        <TouchableOpacity
          onPress={handleRefresh}
          style={stylesHistory.refreshButton}
        >
          <Ionicons name="refresh" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <Text style={stylesHistory.subLabel}>
        Set the minimum amount required before automatic withdrawal
      </Text>

      {/* Tabs */}
      <View style={stylesHistory.tabs}>
        <TouchableOpacity
          style={[
            stylesHistory.tabButton,
            activeTab === "Rewards" && stylesHistory.tabButtonActive,
          ]}
          onPress={() => {
            setLimit(5);
            setActiveTab("Rewards");
          }}
        >
          <Text
            style={[
              stylesHistory.tabButtonText,
              activeTab === "Rewards" && stylesHistory.tabButtonTextActive,
            ]}
          >
            Rewards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            stylesHistory.tabButton,
            activeTab === "Withdrawals" && stylesHistory.tabButtonActive,
          ]}
          onPress={() => {
            setLimit(5);
            setActiveTab("Withdrawals");
          }}
        >
          <Text
            style={[
              stylesHistory.tabButtonText,
              activeTab === "Withdrawals" &&
                stylesHistory.tabButtonTextActive,
            ]}
          >
            Withdrawals
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rewards List */}
      {activeTab === "Rewards" &&
        id &&
        rewards?.contents?.map((item, index) => (
          <View style={stylesHistory.historyItem} key={index}>
            <View>
              <Text style={stylesHistory.historyAmount}>
                {parseFloat(item.reward).toFixed(4)} ASD
              </Text>
              <Text style={stylesHistory.historyDate}>
                {new Date(item.createdAt).toLocaleString("vi-VN")}
              </Text>
            </View>
            <View style={stylesHistory.completedBadge}>
              <Text style={stylesHistory.completedText}>Completed</Text>
            </View>
          </View>
        ))}

      {/* Withdrawals List */}
      {activeTab === "Withdrawals" &&
        id &&
        histories?.contents?.map((item, index) => (
          <View style={stylesHistory.historyItem} key={index}>
            <View>
              <Text style={stylesHistory.historyAmount}>
                {parseFloat(item.amount).toFixed(4)} ASD
              </Text>
              <Text style={stylesHistory.historyDate}>
                {new Date(item.createdAt).toLocaleString("vi-VN")}
              </Text>
            </View>
            <View style={stylesHistory.completedBadge}>
              <Text style={stylesHistory.completedText}>
                {item.status === "pending" ? "Pending" : "Completed"}
              </Text>
            </View>
          </View>
        ))}

      {/* Loading indicator */}
      {loadingMore && (
        <View style={{ alignItems: "center", padding: 10 }}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
    </View>
  );
};

export default MiningHistory;

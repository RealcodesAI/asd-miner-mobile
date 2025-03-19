import { ScrollView, RefreshControl, View } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import MinerHistory from "@/components/History/MinerHistory";
import ChartHistory from "@/components/History/ChartHistory";
import MiningHistory from "@/components/History/MiningHistory";
import Header from "@/components/Header/Header";
import { useRefresh } from "@/hooks/useRefresh";
import { stylesHistory } from "../css/styles/StylesHistory";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  const { refreshing, refreshKey, onRefresh } = useRefresh();
  const [loadMore, setLoadMore] = useState(false);
  const scrollViewRef = useRef(null);

  // Xử lý sự kiện cuộn để phát hiện khi nào đã đến cuối
  const handleScroll = ({ nativeEvent } : any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    if (isCloseToBottom && !loadMore) {
      setLoadMore(true);
      // Reset loadMore sau 1 giây để tránh trigger liên tục
      setTimeout(() => setLoadMore(false), 1000);
    }
  };

  return (
    <SafeAreaView style={stylesHistory.container}>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Header title="History" />
        <MinerHistory key={`miner-${refreshKey}`} />
        <ChartHistory key={`chart-${refreshKey}`} />
        <MiningHistory
          key={`mining-${refreshKey}`}
          loadMore={loadMore}  // Truyền prop loadMore xuống MiningHistory
        />
      </ScrollView>
    </SafeAreaView>
  );
}
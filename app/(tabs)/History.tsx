import {
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import MinerHistory from "@/components/History/MinerHistory";
import ChartHistory from "@/components/History/ChartHistory";
import MiningHistory from "@/components/History/MiningHistory";
import Header from "@/components/Header/Header";
import { useRefresh } from "@/hooks/useRefresh";
import { stylesHistory } from "../css/styles/StylesHistory";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function History() {
  const { refreshing, refreshKey, onRefresh } = useRefresh();
  const [loadMore, setLoadMore] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Xử lý sự kiện cuộn để theo dõi vị trí và phát hiện khi nào đến cuối
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  scrollY.addListener(({ value }) => {
    setShowScrollToTop(value > 300);
  });

  const handleScrollEnd = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    if (isCloseToBottom && !loadMore) {
      setLoadMore(true);
      // Reset loadMore sau 1 giây để tránh trigger liên tục
      setTimeout(() => setLoadMore(false), 1000);
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={stylesHistory.container}>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        <Header title="History" />
        <MinerHistory key={`miner-${refreshKey}`} />
        <ChartHistory key={`chart-${refreshKey}`} />
        <MiningHistory key={`mining-${refreshKey}`} loadMore={loadMore} />
      </ScrollView>

      {/* Nút quay lại đầu trang */}
      {showScrollToTop && (
        <TouchableOpacity
          onPress={scrollToTop}
          style={stylesHistory.icon}>
          <Ionicons name="chevron-up-outline" size={25} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

import {
  ScrollView,
  RefreshControl,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import Header from "@/components/Header/Header";
import InputWithdraw from "@/components/Withdraw/InputWithdraw";
import WithdrawHistory from "@/components/Withdraw/WithdrawHistory";
import { useRefresh } from "@/hooks/useRefresh";
import { stylesWithdraw } from "../css/styles/StylesWithdraw";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Withdraw = () => {
  const { refreshing, refreshKey, onRefresh } = useRefresh();
  const [loadMore, setLoadMore] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  scrollY.addListener(({ value }) => {
    setShowScrollToTop(value > 300);
  });

  // Xử lý sự kiện cuộn để phát hiện khi nào đã đến cuối
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
    <SafeAreaView style={stylesWithdraw.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
        ref={scrollViewRef}
      >
        <Header title="Withdraw" />
        <InputWithdraw key={`input-${refreshKey}`} />
        <WithdrawHistory loadMore={loadMore} key={`history-${refreshKey}`} />
      </ScrollView>
      {/* Nút quay lại đầu trang */}
      {showScrollToTop && (
        <TouchableOpacity
          onPress={scrollToTop}
          style={stylesWithdraw.icon}>
          <Ionicons name="chevron-up-outline" size={25} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Withdraw;

import {View, Text, ScrollView, RefreshControl} from "react-native";
import React, {useRef, useState} from "react";
import Header from "@/components/Header/Header";
import InputWithdraw from "@/components/Withdraw/InputWithdraw";
import WithdrawHistory from "@/components/Withdraw/WithdrawHistory";
import {useRefresh} from "@/hooks/useRefresh";
import {stylesWithdraw} from "../css/styles/StylesWithdraw";
import {SafeAreaView} from "react-native-safe-area-context";

const Withdraw = () => {
  const {refreshing, refreshKey, onRefresh} = useRefresh();
  const [loadMore, setLoadMore] = useState(false);
  const scrollViewRef = useRef(null);

  // Xử lý sự kiện cuộn để phát hiện khi nào đã đến cuối
  const handleScroll = ({nativeEvent}: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
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
    <SafeAreaView style={stylesWithdraw.container}>
      <ScrollView keyboardShouldPersistTaps="handled"
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                  }
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  ref={scrollViewRef}

      >
        <Header title="Withdraw"/>
        <InputWithdraw key={`input-${refreshKey}`}/>
        <WithdrawHistory
          loadMore={loadMore}
          key={`history-${refreshKey}`
        }/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Withdraw;

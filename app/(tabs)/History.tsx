import { ScrollView, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import MinerHistory from "@/components/History/MinerHistory";
import ChartHistory from "@/components/History/ChartHistory";
import MiningHistory from "@/components/History/MiningHistory";
import Header from "@/components/Header/Header";
import { useRefresh } from "@/hooks/useRefresh";
import { stylesHistory } from "../css/styles/StylesHistory";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {
  const { refreshing, refreshKey, onRefresh } = useRefresh();

  return (
    <SafeAreaView style={stylesHistory.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header title="History" />
        <MinerHistory key={`miner-${refreshKey}`} />
        <ChartHistory key={`chart-${refreshKey}`} />
        <MiningHistory key={`mining-${refreshKey}`} />
      </ScrollView>
    </SafeAreaView>
  );
}

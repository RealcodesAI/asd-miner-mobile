import { ScrollView, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import MinerHistory from "@/components/History/MinerHistory";
import ChartHistory from "@/components/History/ChartHistory";
import MiningHistory from "@/components/History/MiningHistory";
import Header from "@/components/Header/Header";
import {useRefresh} from "@/hooks/useRefresh";
import { stylesHistory } from "../css/styles/StylesHistory";

export default function History() {
  const { refreshing, refreshKey, onRefresh } = useRefresh();


  return (
    <ScrollView
      style={stylesHistory.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Header title="History" />
      <MinerHistory key={`miner-${refreshKey}`} />
      <ChartHistory key={`chart-${refreshKey}`} />
      <MiningHistory key={`mining-${refreshKey}`} />
    </ScrollView>
  );
}
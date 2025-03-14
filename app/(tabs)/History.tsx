import { ScrollView, RefreshControl } from "react-native";
import React from "react";
import { stylesHistory } from "./styles/StylesHistory";
import MinerHistory from "@/components/History/MinerHistory";
import ChartHistory from "@/components/History/ChartHistory";
import MiningHistory from "@/components/History/MiningHistory";
import Header from "@/components/Header/Header";
import useRefresh from "@/hooks/useRefresh";

export default function History() {
  const { refreshing, onRefresh } = useRefresh(() => {
    console.log("Data refreshed!");
  });

  return (
    <ScrollView
      style={stylesHistory.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header title="History" />
      <MinerHistory />
      <ChartHistory />
      <MiningHistory />
    </ScrollView>
  );
}

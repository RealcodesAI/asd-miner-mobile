import { ScrollView, RefreshControl } from "react-native";
import React from "react";
import { stylesHistory } from "./styles/StylesHistory";
import MinerHistory from "@/components/History/MinerHistory";
import ChartHistory from "@/components/History/ChartHistory";
import MiningHistory from "@/components/History/MiningHistory";
import Header from "@/components/Header/Header";

export default function History() {
  return (
    <ScrollView
      style={stylesHistory.container}>
      <Header title="History" />
      <MinerHistory />
      <ChartHistory />
      <MiningHistory />
    </ScrollView>
  );
}

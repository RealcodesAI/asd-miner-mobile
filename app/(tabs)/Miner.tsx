import React from "react";
import { View, Text, ScrollView, Image, RefreshControl, TextStyle } from "react-native";
import Header from "@/components/Header/Header";
import { stylesMiner } from "@/app/(tabs)/styles/StylesMiner";
import MiningControls from "@/components/Miner/MiningControls";
import MiningProgress from "@/components/Miner/MiningProgress";
import MiningLog from "@/components/Miner/MiningLog";
import { useMiner } from "@/hooks/useMiner";
import { useRefresh } from "@/hooks/useRefresh";
import MinerBalance from "@/components/Miner/MinerBalance";
import MiningStats from "@/components/Miner/MiningStats";

const Miner = () => {
  const { refreshing, refreshKey, onRefresh } = useRefresh();
  const { miningPower, isMining, miningLog, toggleMining } = useMiner();

  return (
    <ScrollView
      style={stylesMiner.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header title="Miner" key={`header-${refreshKey}`} />

      <MinerBalance key={`balance-${refreshKey}`}/>


      <MiningControls
        isMining={isMining}
        toggleMining={toggleMining}
        key={`controls-${refreshKey}`}
      />

      <MiningStats miningPower={miningPower} miningLog={miningLog} key={`stats-${refreshKey}`} />
    </ScrollView>
      );
};

export default Miner;

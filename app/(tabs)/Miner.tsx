import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  TextStyle,
} from "react-native";
import Header from "@/components/Header/Header";
import MiningControls from "@/components/Miner/MiningControls";
import MiningProgress from "@/components/Miner/MiningProgress";
import MiningLog from "@/components/Miner/MiningLog";
import { useMiner } from "@/hooks/useMiner";
import { useRefresh } from "@/hooks/useRefresh";
import MinerBalance from "@/components/Miner/MinerBalance";
import MiningStats from "@/components/Miner/MiningStats";
import { stylesMiner } from "../css/styles/StylesMiner";
import { SafeAreaView } from "react-native-safe-area-context";

const Miner = () => {
  const { refreshing, refreshKey, onRefresh } = useRefresh();
  const { miningPower, isMining, miningLog, toggleMining } = useMiner();

  return (
    <SafeAreaView style={stylesMiner.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header title="Miner" key={`header-${refreshKey}`} />
        <MinerBalance key={`balance-${refreshKey}`} />
        <MiningControls
          isMining={isMining}
          toggleMining={toggleMining}
          key={`controls-${refreshKey}`}
        />
        <MiningStats
          miningPower={miningPower}
          miningLog={miningLog}
          key={`stats-${refreshKey}`}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Miner;

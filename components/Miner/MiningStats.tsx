import React from "react";
import { View, Text, TextStyle } from "react-native";
import MiningProgress from "@/components/Miner/MiningProgress";
import MiningLog from "@/components/Miner/MiningLog";
import { stylesMiner } from "@/app/(tabs)/styles/StylesMiner";

interface MiningStatsProps {
  miningPower: number;
  miningLog: string;
}

const MiningStats: React.FC<MiningStatsProps> = ({ miningPower, miningLog }) => {
  return (
    <View style={stylesMiner.Container}>
      <View style={stylesMiner.sliderContainer}>
        <MiningProgress miningPower={miningPower} />
        <Text style={stylesMiner.hashRate as TextStyle}>Mining block... hash rate: 110000 H/S</Text>
        <MiningLog miningLog={miningLog} />
      </View>
    </View>
  );
};

export default MiningStats;

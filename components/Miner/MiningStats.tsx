import React from "react";
import { View, Text, TextStyle } from "react-native";
import MiningLog from "@/components/Miner/MiningLog";
import { stylesMiner } from "@/app/css/styles/StylesMiner";

interface MiningStatsProps {
  miningPower: number;
  miningLog: string[];
}

const MiningStats: React.FC<MiningStatsProps> = ({ miningPower, miningLog }) => {

  return (
    <View style={stylesMiner.Container}>
      <Text style={stylesMiner.text}>Miner Logs</Text>
      <View style={stylesMiner.sliderContainer}>
        <MiningLog miningLog={miningLog} />
      </View>
    </View>
  );
};

export default MiningStats;

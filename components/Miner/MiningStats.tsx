import React from "react";
import { View, Text, TextStyle } from "react-native";
import MiningProgress from "@/components/Miner/MiningProgress";
import MiningLog from "@/components/Miner/MiningLog";
import {useMinerHashRate} from "@/hooks/useMinerHashRate";
import { stylesMiner } from "@/app/css/styles/StylesMiner";

interface MiningStatsProps {
  miningPower: number;
  miningLog: string;
}

const MiningStats: React.FC<MiningStatsProps> = ({ miningPower, miningLog }) => {
  const minerHashRate = useMinerHashRate()
  return (
    <View style={stylesMiner.Container}>
      <View style={stylesMiner.sliderContainer}>
        <MiningProgress miningPower={miningPower} />
        <Text style={stylesMiner.hashRate as TextStyle}>Mining block... hash rate: {minerHashRate} H/S</Text>
        <MiningLog miningLog={miningLog} />
      </View>
    </View>
  );
};

export default MiningStats;

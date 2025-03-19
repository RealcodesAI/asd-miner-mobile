import React from "react";
import { View, Text, Image, TextStyle } from "react-native";
import {useMinerReward} from "@/hooks/useMinerReward";
import { stylesMiner } from "@/app/css/styles/StylesMiner";
import {useMinerStore} from "@/lib/zustand/miner";

const MinerBalance: React.FC = () => {
  const reward = useMinerReward();
  const {minerName} = useMinerStore();
  return (
    <View>
      <Text style={stylesMiner.balance as TextStyle}>
        {reward?.toFixed(4)} ASD
      </Text>
      <Text style={stylesMiner.name as TextStyle}>
        {minerName}
      </Text>
      <Image source={require("@/assets/images/Frame.png")} style={stylesMiner.image} />
    </View>
  );
};

export default MinerBalance;

import React from "react";
import {View, Text, ScrollView, Image, TextStyle} from "react-native";
import Header from "@/components/Header/Header";
import {stylesMiner} from "@/app/(tabs)/styles/StylesMiner";
import MiningControls from "@/components/Miner/MiningControls";
import MiningProgress from "@/components/Miner/MiningProgress";
import MiningLog from "@/components/Miner/MiningLog";
import {useMiner} from "@/hooks/useMiner";

const Miner = () => {
  const {
    miningPower,
    isMining,
    miningLog,
    reward,
    toggleMining
  } = useMiner();

  return (
    <ScrollView style={stylesMiner.container}>
      <Header title="Miner"/>

      <Text style={stylesMiner.balance as TextStyle}>{reward.toFixed(4)} ASD</Text>
      <Image source={require("@/assets/images/Frame.png")} style={stylesMiner.image}/>

      <MiningControls isMining={isMining} toggleMining={toggleMining}/>

      <View style={stylesMiner.Container}>
        <View style={stylesMiner.sliderContainer}>
          <MiningProgress miningPower={miningPower}/>
          <Text style={stylesMiner.hashRate as TextStyle}>
            Mining block... hash rate: 110000 H/S
          </Text>
          <MiningLog miningLog={miningLog}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default Miner;

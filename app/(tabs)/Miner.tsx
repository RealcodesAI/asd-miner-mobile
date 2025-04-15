import React from "react";
import { ScrollView, RefreshControl, ImageBackground, View } from "react-native";
import Header from "@/components/Header/Header";
import MiningControls from "@/components/Miner/MiningControls";
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
    <ImageBackground
      source={require("../../assets/images/BG.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={stylesMiner.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Header title="Mining Dashboard" key={`header-${refreshKey}`} />
          <View style={{ padding: 20 }}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Miner;

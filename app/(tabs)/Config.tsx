import { ImageBackground, RefreshControl, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/Header/Header";
import MinerConfig from "@/components/Config/MinerConfig";
import { stylesConfig } from "../css/styles/StylesConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRefresh } from "@/hooks/useRefresh";

const Config = () => {
  const { refreshing, refreshKey, onRefresh } = useRefresh();
  return (
    <ImageBackground
      source={require("../../assets/images/BG.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={stylesConfig.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Header title="Miner Configuration" key={`header-${refreshKey}`} />
          <MinerConfig key={`miner-config-${refreshKey}`} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Config;

import { RefreshControl, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/Header/Header";
import MinerConfig from "@/components/Config/MinerConfig";
import { stylesConfig } from "../css/styles/StylesConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRefresh } from "@/hooks/useRefresh";

const Config = () => {
  const { refreshing, refreshKey, onRefresh } = useRefresh();
  return (
    <SafeAreaView style={stylesConfig.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header title="Config" key={`header-${refreshKey}`}/>
        <MinerConfig key={`miner-config-${refreshKey}`}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Config;

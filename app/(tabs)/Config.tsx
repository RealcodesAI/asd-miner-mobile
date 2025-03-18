import { ScrollView } from "react-native";
import React from "react";
import Header from "@/components/Header/Header";
import MinerConfig from "@/components/Config/MinerConfig";
import { stylesConfig } from "../css/styles/StylesConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const Config = () => {
  return (
    <SafeAreaView style={stylesConfig.container}>
      <ScrollView>
        <Header title="Config" />
        <MinerConfig />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Config;

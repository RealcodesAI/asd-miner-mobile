import { ImageBackground, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/Header/Header";
import MenuItem from "@/components/Setting/MenuItem";

const Settings = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/BG.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView>
        <Header title="Settings" />
        <MenuItem />
      </ScrollView>
    </ImageBackground>
  );
};

export default Settings;

import { View, Text, StatusBar, Image } from "react-native";
import React, { useEffect } from "react";
import { getUserStore } from "@/lib/zustand/getUser";
import SettingOverlay from "@/components/Setting/SettingOverlay";
import { stylesSetting } from "../css/styles/StylesSetting";

const Settings = () => {
  const {user,getMe } = getUserStore()
  useEffect(() => {
    getMe()
  },[])

  return (
    <View style={stylesSetting.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={stylesSetting.header}>
        <Text style={stylesSetting.headerText}>About app</Text>
        <View style={stylesSetting.groupImage}>
          <Image
            source={require("../../assets/images/avatar/image 173.png")}
            style={stylesSetting.avatar}
          />
          <Text style={stylesSetting.appTitle}>{user?.ct360UserName}</Text>
        </View>
      </View>

      {/* ScrollView nổi lên trên nền vàng */}
      <SettingOverlay/>
    </View>
  );
};

export default Settings;

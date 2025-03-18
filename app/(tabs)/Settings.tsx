import { View, Text, StatusBar, Image } from "react-native";
import React, { useEffect } from "react";
import { getUserStore } from "@/lib/zustand/getUser";
import SettingOverlay from "@/components/Setting/SettingOverlay";
import { stylesSetting } from "../css/styles/StylesSetting";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { user, getMe } = getUserStore();
  useEffect(() => {
    getMe();
  }, []);

  return (
    <SafeAreaView style={stylesSetting.container}>
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
        <SettingOverlay />
    </SafeAreaView>
  );
};

export default Settings;

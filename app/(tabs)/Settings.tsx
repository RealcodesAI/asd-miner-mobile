import { View, Text, StatusBar, Image, ScrollView } from "react-native";
import React from "react";
import { useAuthStore } from "@/lib/zustand/auth";
import MenuItem from "@/components/Setting/MenuItem";
import { stylesSetting } from "./styles/StylesSetting";

const Settings = () => {
  const { fetchLogout } = useAuthStore();

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
          <Text style={stylesSetting.appTitle}>Dogecoin Miner</Text>
        </View>
      </View>

      {/* ScrollView nổi lên trên nền vàng */}
      <ScrollView style={stylesSetting.overlay}>
        {/* Information Section */}
        <View style={stylesSetting.section}>
          <MenuItem
            title="Version"
            description="1.0.0"
            image={require("../../assets/icon/exclamation-circle.png")}
          />
          <MenuItem
            title="Rate the app 5 stars"
            image={require("../../assets/icon/star.png")}
          />
          <MenuItem
            title="Terms and conditions"
            image={require("../../assets/icon/shield-check.png")}
          />
          <MenuItem
            title="Contact Us"
            image={require("../../assets/icon/mail.png")}
          />
        </View>

        {/* Studio Section */}
        <View style={stylesSetting.section}>
          <Text style={stylesSetting.textSection}>Studio</Text>
          <View style={stylesSetting.menuItem}>
            <Image
              source={require("../../assets/icon/newspaper.png")}
              style={stylesSetting.icon}
            />
            <View style={stylesSetting.menuTextContainer}>
              <Text style={stylesSetting.menuTitle}>Your developer name</Text>
              <Text style={stylesSetting.menuDescription}>
                Android App Specialist
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

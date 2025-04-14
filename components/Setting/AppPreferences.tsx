import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/lib/zustand/auth";
import { stylesSetting } from "@/app/css/styles/StylesSetting";
import { Switch } from "react-native-gesture-handler";

const AppPreferences = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
  return (
        <View style={stylesSetting.card}>
          <Text style={stylesSetting.cardTitle}>App Preferences</Text>
          <View style={stylesSetting.settingRow}>
            <View style={stylesSetting.settingText}>
              <Text style={stylesSetting.settingTitle}>Dark Mode</Text>
              <Text style={stylesSetting.settingSubtitle}>
                Switch between light and dark theme
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#767577", true: "#FEBF32" }}
              thumbColor={darkMode ? "#fff" : "#fff"}
            />
          </View>
          <View style={stylesSetting.settingRow}>
            <View style={stylesSetting.settingText}>
              <Text style={stylesSetting.settingTitle}>Notifications</Text>
              <Text style={stylesSetting.settingSubtitle}>
                Receive mining status notifications
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: "#FEBF32" }}
              thumbColor={notifications ? "#fff" : "#fff"}
            />
          </View>
        </View>
  );
};

export default AppPreferences;

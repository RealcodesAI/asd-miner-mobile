import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { stylesSetting } from "@/app/css/styles/StylesSetting";
import AppPreferences from "./AppPreferences";
import Security from "./Security";
import DataManagement from "./DataManagement";
import MiningPerformance from "./MiningPerformance";
import { useAuthStore } from "@/lib/zustand/auth";

export default function MenuItem() {
  const { fetchLogout } = useAuthStore();
  return (
    <View style={stylesSetting.container}>
      <View style={stylesSetting.content}>
        {/* App Preferences */}
        <AppPreferences />
        {/* Security */}
        <Security />
        {/* Data Management */}
        <DataManagement />
        {/* Mining Performance */}
        <MiningPerformance />
        {/* Logout Button */}
        <TouchableOpacity
          style={stylesSetting.logoutButton}
          onPress={fetchLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#000" />
          <Text style={stylesSetting.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={stylesSetting.versionText}>ASD Miner v1.0.0</Text>
      </View>
    </View>
  );
}

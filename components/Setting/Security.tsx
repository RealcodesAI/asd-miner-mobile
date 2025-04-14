import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { stylesSetting } from "@/app/css/styles/StylesSetting";

const Security = () => {
  const [twoFA, setTwoFA] = useState(false);
  return (
    <View style={stylesSetting.card}>
      <Text style={stylesSetting.cardTitle}>Security</Text>
      <View style={stylesSetting.settingRow}>
        <View style={stylesSetting.settingText}>
          <Text style={stylesSetting.settingTitle}>
            Two-Factor Authentication
          </Text>
          <Text style={stylesSetting.settingSubtitle}>
            Add an extra layer of security to your account
          </Text>
        </View>
        <Switch
          value={twoFA}
          onValueChange={setTwoFA}
          trackColor={{ false: "#767577", true: "#FEBF32" }}
          thumbColor={twoFA ? "#fff" : "#fff"}
        />
      </View>
      <TouchableOpacity style={stylesSetting.outlineButton}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" />
        <Text style={stylesSetting.outlineButtonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Security;

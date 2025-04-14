import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { stylesSetting } from "@/app/css/styles/StylesSetting";
import { Ionicons } from "@expo/vector-icons";

const DataManagement = () => {
  return (
    <View style={stylesSetting.card}>
      <Text style={stylesSetting.cardTitle}>Data Management</Text>
      <TouchableOpacity style={stylesSetting.outlineButton}>
        <Ionicons name="cloud-download-outline" size={20} color="#fff" />
        <Text style={stylesSetting.outlineButtonText}>Export Mining Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DataManagement;

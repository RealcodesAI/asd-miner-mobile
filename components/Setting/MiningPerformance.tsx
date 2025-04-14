import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { stylesSetting } from "@/app/css/styles/StylesSetting";
import { Ionicons } from "@expo/vector-icons";

const MiningPerformance = () => {
  return (
    <View style={stylesSetting.card}>
      <Text style={stylesSetting.cardTitle}>
        ⚠️ Mining Performance
      </Text>
      <Text style={stylesSetting.warningText}>
        These actions cannot be undone
      </Text>
      <TouchableOpacity style={stylesSetting.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#FF4D4D"/>
        <Text style={stylesSetting.deleteButtonText}>Delete Miner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MiningPerformance;

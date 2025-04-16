import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { stylesSetting } from "@/app/css/styles/StylesSetting";
import { Ionicons } from "@expo/vector-icons";
import { useMinerStore } from "@/lib/zustand/miner";
import { deleteMinerStore } from "@/lib/zustand/deleteMiner";
import * as SecureStore from "expo-secure-store";
import { router, useRouter } from 'expo-router';


const MiningPerformance = () => {
  const { id } = useMinerStore();
  const {deleteLicense} = deleteMinerStore()
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteLicense(id);
      await SecureStore.deleteItemAsync("minerConfig");
      router.push('/(tabs)/Config')
    } catch (err) {
      console.log('Error deleting license:', err);
    }
  }
  return (
    <View style={stylesSetting.card}>
      <Text style={stylesSetting.cardTitle}>
        ⚠️ Mining Performance
      </Text>
      <Text style={stylesSetting.warningText}>
        These actions cannot be undone
      </Text>
      <TouchableOpacity style={stylesSetting.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="#FF4D4D"/>
        <Text style={stylesSetting.deleteButtonText}>Delete Miner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MiningPerformance;

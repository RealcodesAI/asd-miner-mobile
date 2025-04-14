import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // hoặc react-native-vector-icons
import { stylesHeader } from "@/app/css/styles/StylesHeader";

interface Props {
  title: string;
}
export default function Header({ title }: Props) {
  return (
    <>
      <View style={stylesHeader.container}>
        {/* Avatar + Text */}
        <View style={stylesHeader.leftSection}>
          <Image
            source={{ uri: "https://i.imgur.com/xxu1Jqg.jpg" }} // Thay ảnh avatar của bạn
            style={stylesHeader.avatar}
          />
          <View style={stylesHeader.textContainer}>
            <Text style={stylesHeader.greeting}>Good Morning 👋</Text>
            <Text style={stylesHeader.username}>Rose Pham</Text>
          </View>
        </View>

        {/* Bell Icon */}
        <TouchableOpacity style={stylesHeader.bellButton}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={stylesHeader.textTitle}>{title}</Text>
      </View>
    </>
  );
}

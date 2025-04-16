import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // hoặc react-native-vector-icons
import { stylesHeader } from "@/app/css/styles/StylesHeader";
import { getUserStore } from "@/lib/zustand/getUser";

interface Props {
  title: string;
}
export default function Header({ title }: Props) {
  const { user, getMe } = getUserStore();
  useEffect(() => {
    getMe();
  }, []);
  return (
    <>
      <View style={stylesHeader.container}>
        {/* Avatar + Text */}
        <View style={stylesHeader.leftSection}>
          <Image
            source={
              user?.avatar
                ? { uri: user?.avatar }
                : require("../../assets/images/image-user-default.png")
            }
            style={stylesHeader.avatar}
          />
          <View style={stylesHeader.textContainer}>
            <Text style={stylesHeader.greeting}>Good Morning 👋</Text>
            <Text style={stylesHeader.username}>{user?.username}</Text>
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

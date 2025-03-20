import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { stylesHeader } from "@/app/css/styles/StylesHeader";
import { getUserStore } from "@/lib/zustand/getUser";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const { userCt } = getUserStore();
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={stylesHeader.header}>
        <Text style={stylesHeader.title}>{title}</Text>
        <View style={stylesHeader.imageGroup}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/icon/notification-bing.png")}
              style={stylesHeader.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require("../../assets/icon/Search.png")}
              style={stylesHeader.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            {userCt?.avatar ? (
              <Image
                source={{ uri: userCt?.avatar }}
                style={[
                  stylesHeader.icon,
                  { borderWidth: 1, borderColor: "#fff", borderRadius: 50 },
                ]}
              />
            ) : (
              <Ionicons name="person-outline" size={24} color="#AEA8B2" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

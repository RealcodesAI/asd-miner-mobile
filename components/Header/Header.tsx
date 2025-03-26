import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { stylesHeader } from "@/app/css/styles/StylesHeader";
import { getUserStore } from "@/lib/zustand/getUser"

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const { user } = getUserStore();
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
            <Image
              source={
                user?.avatar
                  ? { uri: user?.avatar }
                  : require("../../assets/images/image-user-default.png")
              }
              style={[stylesHeader.icon,{borderRadius:100}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

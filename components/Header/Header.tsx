import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { stylesHistory } from "@/app/(tabs)/styles/StylesHistory";

interface Props {
  title: string;
}

const Header = ({title}: Props) => {
  return (
    <View style={stylesHistory.header}>
      <Text style={stylesHistory.title}>{title}</Text>
      <View style={stylesHistory.imageGroup}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/icon/notification-bing.png")}
            style={stylesHistory.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../assets/icon/Search.png")}
            style={stylesHistory.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: "#fff",
            backgroundColor: "#fff",
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("../../assets/images/avatar/unsplash_X6Uj51n5CE8.png")}
            style={stylesHistory.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { stylesHeader } from "@/app/css/styles/StylesHeader";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
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
              source={require("../../assets/images/avatar/unsplash_X6Uj51n5CE8.png")}
              style={stylesHeader.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

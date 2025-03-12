import { 
  View, Text, Image, TouchableWithoutFeedback, TouchableOpacity 
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { stylesHeader } from "@/app/(tabs)/styles/StylesHeader";
import { useAuthStore } from "@/lib/zustand/auth";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {fetchLogout} = useAuthStore()
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

          {/* Avatar mở popup */}
          <TouchableOpacity
            style={stylesHeader.avatarContainer}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("../../assets/images/avatar/unsplash_X6Uj51n5CE8.png")}
              style={stylesHeader.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Overlay và Popup */}
      {modalVisible && (
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={stylesHeader.overlay}>
            <View style={stylesHeader.popupContainer}>
              {/* Nút Logout */}
              <TouchableOpacity style={stylesHeader.logoutButton} onPress={fetchLogout}>
                <Ionicons name="log-out-outline" size={24} color="white" />
                <Text style={stylesHeader.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default Header;

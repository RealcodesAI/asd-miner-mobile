import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { stylesConfig } from "@/app/(tabs)/styles/StylesConfig";

interface LicenseModalProps {
  visible: boolean;
  onClose: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  filteredLicenses: { licenseKey: string }[];
  handleLicense: (licenseKey: string) => void;
  maskText: (text: string) => string;
}

const LicenseModal: React.FC<LicenseModalProps> = ({
  visible,
  onClose,
  searchText,
  setSearchText,
  filteredLicenses,
  handleLicense,
  maskText,
}) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={stylesConfig.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={stylesConfig.modalContent}>
              {/* Thanh tìm kiếm */}
              <TextInput
                style={stylesConfig.searchInput}
                placeholder="Search license..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
              />

              <FlatList
                data={filteredLicenses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleLicense(item.licenseKey)}>
                    <View style={stylesConfig.dropdownItem}>
                      <Text style={{ color: "#FFF" }}>{maskText(item.licenseKey)}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LicenseModal;

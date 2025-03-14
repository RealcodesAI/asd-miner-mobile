import React, { useState, useEffect } from "react";
import { Modal, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { stylesConfig } from "@/app/(tabs)/styles/StylesConfig";

const HashRateModal = ({ visible, hashRate, onClose }) => {
  const [showHashRate, setShowHashRate] = useState(false);

  useEffect(() => {
    if (visible) {
      setShowHashRate(false);
      const timer1 = setTimeout(() => setShowHashRate(true), 5000); // Hiển thị hashRate sau 5s
      const timer2 = setTimeout(onClose, 7000); // Đóng modal sau 7s
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={stylesConfig.modalOverlay}>
        <View style={stylesConfig.modalContainer}>
          {showHashRate ? (
            <Text style={stylesConfig.modalText}>Hash Rate: {hashRate}</Text>
          ) : (
            <>
              <ActivityIndicator size="large" color="#FFF" />
              <Text style={stylesConfig.modalText}>Calculating hash rate...</Text>
            </>
          )}
          <TouchableOpacity style={stylesConfig.button} onPress={onClose}>
            <Text style={stylesConfig.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default HashRateModal;

import React, { useEffect, useState } from "react";
import { Modal, View, ActivityIndicator, Text, StyleSheet } from "react-native";

const LoadingModal = ({ visible, hashRate, setVisible }: { visible: boolean; hashRate: string | number; setVisible: (visible: boolean) => void }) => {
  const [showHashRate, setShowHashRate] = useState(false);

  useEffect(() => {
    if (visible) {
      setShowHashRate(false); // Reset khi mở modal
      const timer1 = setTimeout(() => setShowHashRate(true), 4950);
      const timer2 = setTimeout(() => setVisible(false), 9000); 
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [visible]);

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {!showHashRate ? (
            <>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.text}>Calculating hash rate...</Text>
            </>
          ) : (
            <Text style={styles.hashRateText}>Your device can mine at approximately {hashRate} hashes per second</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  text: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
  hashRateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50", // Màu xanh lá để nổi bật hash rate
  },
});

export default LoadingModal;

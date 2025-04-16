import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { stylesSetting } from "@/app/css/styles/StylesSetting";
import { qrCode2FAStore } from "@/lib/zustand/qrCode2FA";
import QRCodeModal from "./Modal/QrCodeModal";
import VerifyCodeModal from "./Modal/VerifyCodeModal";
import showToast from "@/lib/utils/toastService";

const Security = () => {
  const [is2FAModalVisible, setIs2FAModalVisible] = useState(false);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const { getQrCode2FA, vertfyQrCode2FA, set2FAEnabledGlobal } = qrCode2FAStore();
  const [localTwoFAEnabled, setLocalTwoFAEnabled] = useState(false);

  useEffect(() => {
    if (localTwoFAEnabled) {
      getQrCode2FA();
      setIs2FAModalVisible(true);
    } else {
      setIs2FAModalVisible(false);
      setIsVerifyModalVisible(false);
    }
  }, [localTwoFAEnabled, getQrCode2FA]);

  const toggle2FA = () => {
    setLocalTwoFAEnabled(!localTwoFAEnabled);
  };

  const handleEnable2FA = () => {
    setIs2FAModalVisible(false);
    setIsVerifyModalVisible(true);
  };

  const handleVerifyCode = async (token: string) => {
    try {
      const isSuccess = await vertfyQrCode2FA(token);
      if (isSuccess) {
        set2FAEnabledGlobal(true);
        setIsVerifyModalVisible(true);
      } else {
        showToast("An error occurred during verification.", "danger");
      }
    } catch (error) {
      showToast("Please enter a 6-digit verification code.", "warning")
    }
  };

  return (
    <View style={stylesSetting.card}>
      <Text style={stylesSetting.cardTitle}>Security</Text>
      <View style={stylesSetting.settingRow}>
        <View style={stylesSetting.settingText}>
          <Text style={stylesSetting.settingTitle}>Two-Factor Authentication</Text>
          <Text style={stylesSetting.settingSubtitle}>Add an extra layer of security to your account</Text>
        </View>
        <Switch
          value={localTwoFAEnabled}
          onValueChange={toggle2FA}
          trackColor={{ false: "#767577", true: "#FEBF32" }}
          thumbColor={localTwoFAEnabled ? "#fff" : "#fff"}
        />
      </View>
      <TouchableOpacity style={stylesSetting.outlineButton}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" />
        <Text style={stylesSetting.outlineButtonText}>Change Password</Text>
      </TouchableOpacity>

      <QRCodeModal
        isVisible={is2FAModalVisible}
        onClose={() => setLocalTwoFAEnabled(false)}
        onEnable2FA={handleEnable2FA}
      />

      <VerifyCodeModal
        isVisible={isVerifyModalVisible}
        onClose={() => {setIsVerifyModalVisible(false); setLocalTwoFAEnabled(false)}}
        onVerifyCode={handleVerifyCode}
      />
    </View>
  );
};

export default Security;
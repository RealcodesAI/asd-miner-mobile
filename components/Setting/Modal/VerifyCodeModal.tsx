import React, { useState, useRef } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { stylesSetting } from "@/app/css/styles/StylesSetting";

interface VerifyCodeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onVerifyCode: (token: string) => void;
}

const VerifyCodeModal: React.FC<VerifyCodeModalProps> = ({ isVisible, onClose, onVerifyCode }) => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>(Array(6).fill(null));

  const handleCodeChange = (text: string, index: number) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;
    setVerificationCode(newVerificationCode);

    if (text.length === 1 && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = '';
    setVerificationCode(newVerificationCode);

    if (index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const token = verificationCode.join("");
    onVerifyCode(token);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={stylesSetting.modalContainer}>
        <View style={stylesSetting.modalContent}>
          <Text style={stylesSetting.modalTitle}>Verify Two-Factor Code</Text>
          <Text style={stylesSetting.modalSubtitle}>Enter the 6-digit code from your authenticator app.</Text>
          <View style={stylesSetting.verificationCodeContainer}>
            {verificationCode.map((digit, index) => (
              <TextInput
                key={index}
                style={stylesSetting.verificationCodeInput}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(index);
                  }
                }}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </View>
          {/* Bạn có thể thêm trạng thái loading và lỗi ở đây nếu cần */}
          <View style={stylesSetting.modalButtonsContainer}>
            <TouchableOpacity
              style={[stylesSetting.secondaryButton, stylesSetting.modalButton]}
              onPress={onClose}
            >
              <Text style={stylesSetting.buttonModal}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesSetting.secondaryButton, stylesSetting.modalButton]} // Có thể đổi thành primaryButton
              onPress={handleSubmit}
            >
              <Text style={stylesSetting.buttonModal}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VerifyCodeModal;
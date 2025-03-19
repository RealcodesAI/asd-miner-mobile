import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "@/components/ButtonAuth/Button";
import { useRouter } from "expo-router";
import { stylesAuth } from "./styles/stylesAuth";
import { useAuthStore } from "@/lib/zustand/auth";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const {
    username,
    password,
    usernameError,
    passwordError,
    setUsername,
    setPassword,
    fetchLogin,
    verify2FA,
  } = useAuthStore();

  const handleLogin = async () => {
    const requires2FA = await fetchLogin();
    if (requires2FA) {
      setModalVisible(true);
    }
  };

  const handleVerify2FA = async () => {
    const success = await verify2FA(username, otp, "2fa");
    // console.log(otp)
    if (success) {
      setModalVisible(false);
      router.push("/(tabs)/Miner");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#000" }}
    >
      <ScrollView
        contentContainerStyle={stylesAuth.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require("../../assets/images/logoAsd.png")} />
        <Text style={stylesAuth.title}>Welcome to ASD miner {"\n"}</Text>
        <Text style={stylesAuth.title}>Login with ct360 account</Text>

        <View style={stylesAuth.form}>
          {/* User Name */}
          <View>
            <Text style={stylesAuth.textInput}>User Name</Text>
            <View style={stylesAuth.inputContainer}>
              <TextInput
                style={stylesAuth.input}
                placeholder="Enter Username"
                placeholderTextColor="#676767"
                value={username}
                onChangeText={setUsername}
              />
              <Ionicons
                name="person-outline"
                size={18}
                color="#AEA8B2"
                style={stylesAuth.icon}
              />
            </View>
            {usernameError && (
              <Text style={{ color: "red" }}>{usernameError}</Text>
            )}
          </View>

          {/* Password */}
          <View>
            <Text style={stylesAuth.textInput}>Password</Text>
            <View style={stylesAuth.inputContainer}>
              <TextInput
                style={stylesAuth.input}
                placeholder="Enter Password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#676767"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color="#AEA8B2"
                  style={stylesAuth.icon}
                />
              </TouchableOpacity>
            </View>
            {passwordError && (
              <Text style={{ color: "red" }}>{passwordError}</Text>
            )}
          </View>

          {/* Nút Login sẽ mở modal */}
          <Button title={"Login"} onPress={handleLogin} />
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push("https://ct360.io/Members/Register?ref=undefined")
          }
        >
          <Text style={stylesAuth.registerText}>
            Register for a ct360 account
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={stylesAuth.modalContainer}>
            <View style={stylesAuth.modalContent}>
              {/* Nút đóng bằng Icon X ở góc phải */}
              <TouchableOpacity
                style={stylesAuth.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>

              <Text style={stylesAuth.modalTitle}>
                Two-Factor Authentication
              </Text>
              <Text style={stylesAuth.textInput}>
                Enter an authenticator app code
              </Text>
              <TextInput
                style={stylesAuth.inputModal}
                placeholder="2FA Code"
                placeholderTextColor="#676767"
                value={otp}
                onChangeText={setOtp}
              />
              <Button
                title="Confirm"
                onPress={handleVerify2FA}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Login;

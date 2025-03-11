import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/components/ButtonAuth/Button";
import { stylesAuth } from "./styles/stylesAuth";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const handleResetPass = () => {
    // Xử lý đăng ký
    router.push("/auth/Login");
  };
  return (
    <ScrollView
      contentContainerStyle={stylesAuth.container}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={require("../../assets/images/logoAsd.png")} />
      <Text style={stylesAuth.title}>Reset password {"\n"}</Text>
      <Text style={stylesAuth.title}>We've send OTP to your email</Text>

      <View style={stylesAuth.form}>
        {/* User Name */}
        <View>
          <Text style={stylesAuth.textInput}>OTP Email</Text>
          <View style={stylesAuth.inputContainer}>
            <TextInput
              style={stylesAuth.input}
              placeholder="OTP email"
              placeholderTextColor="#676767"
            />
          </View>
        </View>

        {/* Password */}
        <View>
          <Text style={stylesAuth.textInput}>New Password</Text>
          <View style={stylesAuth.inputContainer}>
            <TextInput
              style={stylesAuth.input}
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#676767"
            />
          </View>
        </View>

        {/* Confirm Password */}
        <View>
          <Text style={stylesAuth.textInput}>Confirm Password</Text>
          <View style={stylesAuth.inputContainer}>
            <TextInput
              style={stylesAuth.input}
              placeholder="Enter Password"
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#676767"
            />
          </View>
        </View>

        <Button title={"Reset Password"} onPress={handleResetPass} />
      </View>

      <TouchableOpacity onPress={() => router.push("/auth/Login")}>
        <Text style={stylesAuth.registerText}>
          Don't have an account? Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResetPassword;

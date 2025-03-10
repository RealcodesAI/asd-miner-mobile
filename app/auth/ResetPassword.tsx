import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import Button from "@/components/ButtonAuth/Button";
import { stylesAuth } from "./styles/stylesAuth";
import { ScrollView } from "react-native";
import { Icon } from "react-native-vector-icons/Feather";
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
      <Text style={stylesAuth.title}>Welcome to ASD miner {"\n"}</Text>
      <Text style={stylesAuth.title}>Login to continue</Text>

      <View style={stylesAuth.form}>
        {/* User Name */}
        <View>
          <Text style={stylesAuth.textInput}>OTP Email</Text>
          <View style={stylesAuth.inputContainer}>
            <TextInput
              style={stylesAuth.input}
              placeholder="Enter your user id"
              placeholderTextColor="#676767"
            />
            <Icon
              name="user"
              size={15}
              color="#AEA8B2"
              style={stylesAuth.icon}
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
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                size={15}
                color="#AEA8B2"
                style={stylesAuth.icon}
              />
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={15}
                color="#AEA8B2"
                style={stylesAuth.icon}
              />
            </TouchableOpacity>
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

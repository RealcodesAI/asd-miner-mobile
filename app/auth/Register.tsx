import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Button from "@/components/ButtonAuth/Button";
import { useRouter } from "expo-router";
import { stylesAuth } from "./styles/stylesAuth";
import { useAuthStore } from "@/lib/zustand/auth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const {
    username,
    password,
    confirmPassword,
    usernameError,
    passwordError,
    confirmPasswordError,
    setUsername,
    setPassword,
    setConfirmPassword,
    fetchRegister,
  } = useAuthStore();

  return (
    <ScrollView
      contentContainerStyle={stylesAuth.container}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={require("../../assets/images/logoAsd.png")} />
      <Text style={stylesAuth.title}>Start your mining journey now</Text>

      <View style={stylesAuth.form}>
        {/* User Name */}
        <View>
          <Text style={stylesAuth.textInput}>User Name</Text>
          <View style={stylesAuth.inputContainer}>
            <TextInput
              style={stylesAuth.input}
              placeholder="Enter your user id"
              placeholderTextColor="#676767"
              value={username}
              onChangeText={setUsername}
            />
            <Icon
              name="user"
              size={15}
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
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                size={15}
                color="#AEA8B2"
                style={stylesAuth.icon}
              />
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          )}
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
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
          {confirmPasswordError && (
            <Text style={{ color: "red" }}>{confirmPasswordError}</Text>
          )}
        </View>

        <Button title={"Register"} onPress={fetchRegister} />
      </View>

      <TouchableOpacity onPress={() => router.push("/auth/Login")}>
        <Text style={stylesAuth.registerText}>
          Don't have an account? Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

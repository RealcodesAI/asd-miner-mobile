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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    username,
    password,
    usernameError,
    passwordError,
    setUsername,
    setPassword,
    fetchLogin,
  } = useAuthStore();

  return (
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
        <Button title={"Login"} onPress={fetchLogin} />
      </View>

      <TouchableOpacity onPress={() => router.push("https://ct360.io/Members/Register?ref=undefined")}>
        <Text style={stylesAuth.registerText}>
        Register for a ct360 account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;

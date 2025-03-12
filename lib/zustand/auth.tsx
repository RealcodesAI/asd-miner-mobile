import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ToastAndroid } from "react-native";

interface AuthState {
  username: string;
  password: string;
  isLoading: boolean;
  usernameError: string | null;
  passwordError: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  fetchLogin: () => Promise<void>;
  fetchLogout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  username: "",
  password: "",
  isLoading: false,
  usernameError: null,
  passwordError: null,

  setUsername: (username) => {
    set({ username });
  },

  setPassword: (password) => {
    set({ password });
    if (password.length < 6 && password.length > 0) {
      set({ passwordError: "Password must be at least 6 characters" });
    } else {
      set({ passwordError: null });
    }
  },

  fetchLogin: async () => {
    const { username, password, usernameError, passwordError } = get();
    if (usernameError || passwordError || !username || !password) {
      set({
        usernameError: "Please enter email",
        passwordError: "Please enter password",
      });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await AsdApi.login(username, password);
      await AsyncStorage.setItem("jwt", response.jwt);
      // console.log(response.jwt)
      ToastAndroid.show("Login successfully", ToastAndroid.SHORT);
      set({ username: "", password: "" });
      router.push("/(tabs)/Miner");
    } catch (err: any) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchLogout: async () => {
    await AsyncStorage.removeItem("jwt");
    // await AsyncStorage.removeItem("minerConfig");
    set({
      username: "",
      password: "",
      usernameError: null,
      passwordError: null,
    });
    router.push("/auth/Login");
  },
}));

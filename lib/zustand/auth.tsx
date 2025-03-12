import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ToastAndroid } from "react-native";

interface AuthState {
  username: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  usernameError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  fetchLogin: () => Promise<void>;
  fetchLogout: () => Promise<void>;
  fetchRegister: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  username: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  usernameError: null,
  passwordError: null,
  confirmPasswordError: null,

  setUsername: (username) => {
    set({ username });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username) && username.length > 0) {
      set({ usernameError: "Invalid email format" });
    } else {
      set({ usernameError: null });
    }
  },

  setPassword: (password) => {
    set({ password });
    if (password.length < 6 && password.length > 0) {
      set({ passwordError: "Password must be at least 6 characters" });
    } else {
      set({ passwordError: null });
    }
  },

  setConfirmPassword: (confirmPassword) => {
    set({ confirmPassword });
    if (confirmPassword !== get().password && confirmPassword.length > 0) {
      set({ confirmPasswordError: "Passwords do not match" });
    } else {
      set({ confirmPasswordError: null });
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
    set({
      username: "",
      password: "",
      usernameError: null,
      passwordError: null,
    });
    router.push("/auth/Login");
  },

  fetchRegister: async () => {
    const { username, password,confirmPassword, usernameError, passwordError,confirmPasswordError } = get();
    if (!username || !password || !confirmPassword) {
      set({
        usernameError: username ? null : "Please enter email",
        passwordError: password ? null : "Please enter password",
        confirmPasswordError: confirmPassword ? null : "Please confirm password",
      });
      return;
    }
    if (usernameError || passwordError || confirmPasswordError) {
      return;
    }
    set({ isLoading: true });
    try {
      await AsdApi.register(username, password);
      ToastAndroid.show("Register successfully", ToastAndroid.SHORT);
      set({ password: "", confirmPassword: "", passwordError: null, confirmPasswordError: null });
      router.push("/auth/Login");
    } catch (err: any) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    } finally {
      set({ isLoading: false });
    }
  }
}));

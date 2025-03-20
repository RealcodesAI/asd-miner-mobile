import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import showToast from "../utils/toastService";
import { resetAllStores } from "./resetStore";

interface AuthState {
  username: string;
  password: string;
  isLoading: boolean;
  usernameError: string | null;
  passwordError: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  fetchLogin: () => Promise<boolean>;
  verify2FA: (username: string, otp: string) => Promise<boolean>;
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
    const { username, password } = get();
    if (!username || !password) {
      set({
        usernameError: "Please enter username",
        passwordError: "Please enter password",
      });
      return false;
    }

    set({ isLoading: true });
    try {
      const response = await AsdApi.login(username, password);
      console.log(response);
      if (response && response.nextStep && response.nextStep === "2fa") {
        set({ username });
        return true;
      }
      await AsyncStorage.setItem("jwt", response.jwt);
      // console.log(response.jwt)
      showToast("Login successfully", "success");
      set({ username: "", password: "" });
      router.push("/(tabs)/Miner");
      return false;
    } catch (err: any) {
      showToast(err.message, "danger");
      console.log(err);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  verify2FA: async (username, otp) => {
    try {
      const response = await AsdApi.verify2FA(username, otp);
      await AsyncStorage.setItem("jwt", response.jwt);
      showToast("2FA verified successfully", "success");
      return true;
    } catch (err: any) {
      console.log(err);
      showToast(`2FA verification failed: ${err.message}`, "danger");
      return false;
    }
  },

  fetchLogout: async () => {
    try {
      await AsyncStorage.removeItem("jwt");
      await AsyncStorage.removeItem("minerConfig");
      const jwt = await AsyncStorage.getItem("jwt");

      if (!jwt) {
        // Chỉ gọi resetAllStores() nếu jwt thực sự bị xóa
        resetAllStores();
      }
      showToast("Logout successfully", "success");
      router.push("/auth/Login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  },
}));

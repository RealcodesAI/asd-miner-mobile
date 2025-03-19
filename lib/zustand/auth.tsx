import { create } from "zustand";
import { AsdApi } from "../api/service/asdApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import showToast from "../utils/toastService";

interface AuthState {
  username: string;
  password: string;
  captcha: string;
  isLoading: boolean;
  usernameError: string | null;
  passwordError: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  fetchLogin: () => Promise<boolean>;
  verify2FA: (username: string, otp: string, type: string) => Promise<boolean>;
  fetchLogout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  username: "",
  password: "",
  captcha:"string",
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
    const { username, password, captcha } = get();
    if (!username || !password) {
      set({
        usernameError: "Please enter username",
        passwordError: "Please enter password",
      });
      return false;
    }

    set({ isLoading: true });
    try {
      const response = await AsdApi.login(username, password,captcha);
      console.log(response);
      if(response && response.nextStep && response.nextStep === "2fa"){
        set({username})
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
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  verify2FA: async (username, otp, type) => {
    try {
      const response = await AsdApi.verify2FA(username, otp, type);
      await AsyncStorage.setItem("jwt", response.jwt);
      showToast("2FA verified successfully", "success");
      return true;
    } catch (err: any) {
      showToast(`2FA verification failed: ${err.message}`, "danger");
      return false;
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
    showToast("Logout successfully", "success");
    router.push("/auth/Login");
  },
}));

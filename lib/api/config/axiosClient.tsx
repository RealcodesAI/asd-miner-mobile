import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store";

export const axiosClient = axios.create({
  baseURL: "https://be.asdscan.ai/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await SecureStore.getItemAsync("jwt");
      // console.log(accessToken,'accessToken')
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      // console.error("Error fetching token:", error);
      console.log(error)
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response) => response?.data ?? response, // Đơn giản hóa xử lý response
  (error) => {
    let errorMessage = "Something went wrong!";

    if (error.response?.data) {
      errorMessage = error.response.data;
    }

    return Promise.reject(errorMessage);
  }
);

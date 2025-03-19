import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosClientCT = axios.create({
  baseURL: "https://api.ct360.io/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosClientCT.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await AsyncStorage.getItem("jwt"); 
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
axiosClientCT.interceptors.response.use(
  (response) => response?.data ?? response, // Đơn giản hóa xử lý response
  (error) => {
    let errorMessage = "Something went wrong!";

    if (error.response?.data) {
      errorMessage = error.response.data;
    }

    return Promise.reject(errorMessage);
  }
);

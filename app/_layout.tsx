import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  const router = useRouter()
  const checkUser = async () => {
    const token = await AsyncStorage.getItem("jwt")
    if(!token) {
      router.replace("/auth/Login")
    } else {
      router.replace("/(tabs)/Config")
    }
  }
  useEffect(() => {
    checkUser()
  },[])
  return (
    <ToastProvider duration={3000} animationType="slide-in">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth/Login" />
      </Stack>
    </ToastProvider>
  )
}

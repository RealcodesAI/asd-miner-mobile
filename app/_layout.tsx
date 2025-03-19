import AsyncStorage from "@react-native-async-storage/async-storage";
import {Stack, useRouter} from "expo-router";
import {useEffect} from "react";
import {ToastProvider} from "react-native-toast-notifications";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function RootLayout() {
  const router = useRouter()
  const queryClient = new QueryClient();

  const checkUser = async () => {
    const token = await AsyncStorage.getItem("jwt")
    if (!token) {
      router.replace("/auth/Login")
    } else {
      router.replace("/(tabs)/Config")
    }
  }
  useEffect(() => {
    checkUser()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider duration={3000} animationType="slide-in">
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(tabs)"/>
          <Stack.Screen name="auth/Login"/>
        </Stack>
      </ToastProvider>
    </QueryClientProvider>
  )
}

import "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const router = useRouter();
  const queryClient = new QueryClient();

  const checkUser = async () => {
    const token = await SecureStore.getItemAsync("jwt");
    if (!token) {
      router.replace("/auth/Login");
    } else {
      router.replace("/(tabs)/Config");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider duration={3000} animationType="slide-in">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth/Login" />
          </Stack>
        </ToastProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

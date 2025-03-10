import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter()
  const checkUser = async () => {
    const token = await AsyncStorage.getItem("jwt")
    if(!token) {
      router.replace("/auth/Login")
    } else {
      router.replace("/(tabs)/Miner")
    }
  }
  useEffect(() => {
    checkUser()
  },[])
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="login"/>
    </Stack>
  )
}

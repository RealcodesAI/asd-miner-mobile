import { Image, Keyboard, SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { tabStyles } from "../css/styles/StylesTab";

const tabs = [
  { name: "Miner", icon: require("../../assets/icon/Miner.png") },
  { name: "Config", icon: require("../../assets/icon/Config.png") },
  { name: "Reward", icon: require("../../assets/icon/Reward.png") },
  { name: "Settings", icon: require("../../assets/icon/Setting.png") },
];

export default function TabLayout() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <SafeAreaView style={tabStyles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: isKeyboardVisible
            ? { display: "none" }
            : tabStyles.tabBar,
        }}
      >
        {tabs.map(({ name, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              tabBarLabel: ({ focused }) => (
                <Text
                  style={focused ? tabStyles.labelFocused : tabStyles.label}
                >
                  {name}
                </Text>
              ),
              tabBarIcon: ({ focused }) => (
                <Image
                  source={icon}
                  style={
                    focused ? tabStyles.iconFocused : tabStyles.iconUnfocused
                  }
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </SafeAreaView>
  );
}

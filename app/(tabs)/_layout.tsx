import { Image, Keyboard, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { tabStyles } from "./styles/StylesTab";

const tabs = [
  { name: "Miner", icon: require("../../assets/icon/desktop-computer.png") },
  { name: "Config", icon: require("../../assets/icon/shield-check.png") },
  { name: "Withdraw", icon: require("../../assets/icon/credit-card.png") },
  { name: "History", icon: require("../../assets/icon/document-text.png") },
  { name: "Settings", icon: require("../../assets/icon/cog.png") },
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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: isKeyboardVisible ? { display: "none" } : tabStyles.tabBar,
      }}
    >
      {tabs.map(({ name, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={focused ? tabStyles.labelFocused : tabStyles.label}>
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
  );
}

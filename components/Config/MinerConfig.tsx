import { stylesConfig } from "@/app/(tabs)/styles/StylesConfig";
import { useMinerStore } from "@/lib/zustand/miner";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const MinerConfig = () => {
  const {
    walletAddress,
    minerLicense,
    minerName,
    nameLicense,
    isConfigured,
    setWalletAddress,
    setMinerLicense,
    setMinerName,
    setNameLicense,
    saveMinerConfig,
    loadMinerConfig,
  } = useMinerStore();

  const shortenText = (text: string, startLength = 15, endLength = 15) => {
    if (text.length > startLength + endLength) {
      return `${text.slice(0, startLength)}...${text.slice(-endLength)}`;
    }
    return text;
  };
  useEffect(() => {
    loadMinerConfig();
  }, []);
  return (
    <View style={stylesConfig.containerConfig}>
      <Text style={stylesConfig.title}>Configure your miner</Text>
      <Text style={stylesConfig.note}>
        Note: you can only configure your miner once!
      </Text>

      {/* Wallet Address */}
      <Text style={stylesConfig.label}>Wallet Address</Text>
      <TextInput
        style={[stylesConfig.input, isConfigured && stylesConfig.disabledInput]}
        value={isConfigured ? shortenText(walletAddress) : walletAddress}
        onChangeText={setWalletAddress}
        editable={!isConfigured}
      />
      <Text style={stylesConfig.hintText}>
        Your reward wallet address. Accept EVM wallet address
      </Text>

      {/* Miner Name */}
      <Text style={stylesConfig.label}>Miner name</Text>
      <TextInput
        style={stylesConfig.input}
        value={minerName}
        onChangeText={setMinerName}
      />

      <Text style={stylesConfig.label}>Name license</Text>
      <TextInput
        style={stylesConfig.input}
        value={nameLicense}
        onChangeText={setNameLicense}
      />

      {/* Miner License */}
      <Text style={stylesConfig.label}>Miner license</Text>
      <TextInput
        style={[stylesConfig.input, isConfigured && stylesConfig.disabledInput]}
        value={isConfigured ? shortenText(minerLicense) : minerLicense}
        onChangeText={setMinerLicense}
        editable={!isConfigured}
      />
      <Text style={stylesConfig.hintText}>
        Do not have a license yet?{" "}
        <Link
          href="https://asd-landing-page.pages.dev/#"
          style={stylesConfig.linkText}
        >
          Get you one here.
        </Link>
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={[
          stylesConfig.button,
          isConfigured && stylesConfig.disabledButton,
        ]}
        onPress={saveMinerConfig}
        disabled={isConfigured}
      >
        <Text style={stylesConfig.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MinerConfig;

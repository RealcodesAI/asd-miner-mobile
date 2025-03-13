import { stylesConfig } from "@/app/(tabs)/styles/StylesConfig";
import { getLicenseStore } from "@/lib/zustand/getLicense";
import { useMinerStore } from "@/lib/zustand/miner";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MinerConfig = () => {
  const {
    walletAddress,
    minerLicense,
    minerName,
    isConfigured,
    setWalletAddress,
    setMinerLicense,
    setMinerName,
    saveMinerConfig,
    loadMinerConfig,
  } = useMinerStore();

  const { getLicense, getMinerMine, licenses, minerMine } = getLicenseStore();

  const shortenText = (text: string, startLength = 6, endLength = 6) => {
    if (text.length > startLength + endLength) {
      return `${text.slice(0, startLength)}...${text.slice(-endLength)}`;
    }
    return text;
  };

  const handleLicense = (itemValue: string) => {
    setMinerLicense(itemValue);
    const nameLicense = minerMine.find((miner) => miner.license === itemValue);
    if (nameLicense) {
      setMinerName(nameLicense.name);
    } else {
      setMinerName("");
    }
  };

  const handleSave = async () => {
    const selectedMiner = minerMine.find(
      (miner) => miner.license === minerLicense
    );
    const minerId = selectedMiner?.id
    if (minerLicense && minerName && minerId) {
      const data = {
        walletAddress,
        minerLicense,
        minerName,
        minerId,
        isConfigured: false,
      };
      await AsyncStorage.setItem("minerConfig", JSON.stringify(data));
      console.log(data, "data");
      ToastAndroid.show("Miner data saved locally!", ToastAndroid.SHORT);
    } else {
      saveMinerConfig();
    }
  };

  useEffect(() => {
    loadMinerConfig();
    getLicense();
    getMinerMine();
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
        style={[stylesConfig.input]}
        value={isConfigured ? shortenText(walletAddress) : walletAddress}
        onChangeText={setWalletAddress}
        // editable={!isConfigured}
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

      {/* Miner License */}
      <Text style={stylesConfig.label}>Miner license</Text>
      <View style={[stylesConfig.input, { overflow: "hidden" }]}>
        <Picker
          selectedValue={minerLicense}
          onValueChange={handleLicense}
          style={{ color: "#FFF", backgroundColor: "transparent" }}
          //  mode="dropdown"
        >
          <Picker.Item label="Select a license" value="" />
          {licenses?.map((license, index) => (
            <Picker.Item
              key={index}
              label={license.licenseKey}
              value={license.licenseKey}
            />
          ))}
        </Picker>
      </View>

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
      <TouchableOpacity style={[stylesConfig.button]} onPress={handleSave}>
        <Text style={stylesConfig.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MinerConfig;

import { stylesConfig } from "@/app/(tabs)/styles/StylesConfig";
import { getLicenseStore } from "@/lib/zustand/getLicense";
import { useMinerStore } from "@/lib/zustand/miner";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsdApi } from "@/lib/api/service/asdApi";
import LicenseModal from "./LicenseModal";
import LoadingModal from "./LoadingModal";
import HashRateModal from "./LoadingModal";

const MinerConfig = () => {
  const {
    walletAddress,
    minerLicense,
    minerName,
    hashRate,
    isConfigured,
    setWalletAddress,
    setMinerLicense,
    setMinerName,
    saveMinerConfig,
    loadMinerConfig,
  } = useMinerStore();
  const { getLicense, getMinerMine, licenses, minerMine } = getLicenseStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHashRateModal, setShowHashRateModal] = useState(false);
  const maskText = (text: string, startLength = 11, endLength = 11) => {
    if (!text || text.length <= startLength + endLength) return text;
    return `${text.slice(0, startLength)}...${text.slice(-endLength)}`;
  };
  const [searchText, setSearchText] = useState("");
  const filteredLicenses = licenses.filter((item) =>
    item.licenseKey.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleLicense = (itemValue: string) => {
    setMinerLicense(itemValue);
    setShowDropdown(false);
    const nameLicense = minerMine.find((miner) => miner.license === itemValue);
    setMinerName(nameLicense ? nameLicense.name : "");
  };
  const handleSave = async () => {
    const selectedMiner = minerMine.find(
      (miner) => miner.license === minerLicense
    );
    const minerId = selectedMiner?.id;
    const hashRate = selectedMiner?.hashRate
    // Lấy thông tin miner đã lưu trước đó từ AsyncStorage
    const storedConfig = await AsyncStorage.getItem("minerConfig");
    const previousConfig = storedConfig ? JSON.parse(storedConfig) : {};
    // console.log(previousConfig, "previousConfig");
    if (selectedMiner && !hashRate) {
      ToastAndroid.show("Calculating hash rate, please wait...", ToastAndroid.SHORT);
      await saveMinerConfig();
    }
    if (minerLicense && minerName && minerId) {
      // Nếu license và ID trùng với dữ liệu trước đó nhưng tên thay đổi => gọi updateNameLicense
      if (previousConfig?.minerId === minerId && previousConfig?.minerName !== minerName) {
        try {
          await AsdApi.updateNameLicense(minerName, minerId.toString());
          previousConfig.minerName = minerName;
          await AsyncStorage.setItem("minerConfig", JSON.stringify(previousConfig));
          ToastAndroid.show("Miner name updated successfully!", ToastAndroid.SHORT);
        } catch (err: any) {
          console.error("Error updating miner name:", err);
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        }
      } else {
        // Nếu chưa có thông tin miner hoặc có thay đổi về minerId => lưu lại config mới
        const data = {
          walletAddress,
          minerLicense,
          minerName,
          minerId,
          hashRate,
          isConfigured: false,
        };
        await AsyncStorage.setItem("minerConfig", JSON.stringify(data));
        ToastAndroid.show("Miner data saved locally!", ToastAndroid.SHORT);
      }
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

      <Text style={stylesConfig.label}>Wallet Address</Text>
      <TextInput
        style={[stylesConfig.input, walletAddress && stylesConfig.disabledInput]}
        value={isConfigured ? maskText(walletAddress) : maskText(walletAddress)}
        onChangeText={setWalletAddress}
        editable={!walletAddress}
      />
      <Text style={stylesConfig.hintText}>
        Your reward wallet address. Accept EVM wallet address
      </Text>

      <Text style={stylesConfig.label}>Miner name</Text>
      <TextInput
        style={stylesConfig.input}
        value={minerName}
        onChangeText={setMinerName}
      />

      <Text style={stylesConfig.label}>Miner license</Text>
      <TouchableOpacity
        style={[stylesConfig.input, { justifyContent: "center" }]}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={{ color: "#FFF" }}>
          {maskText(minerLicense) || "Select a license"}
        </Text>
      </TouchableOpacity>

      {showDropdown && (
        <LicenseModal
        visible={showDropdown}
        onClose={() => setShowDropdown(false)}
        searchText={searchText}
        setSearchText={setSearchText}
        filteredLicenses={filteredLicenses}
        handleLicense={handleLicense}
        maskText={maskText}
      />
      )}

      <Text style={stylesConfig.hintText}>
        Do not have a license yet?{" "}
        <Link
          href="https://asd-landing-page.pages.dev/#"
          style={stylesConfig.linkText}
        >
          Get you one here.
        </Link>
      </Text>
      <TouchableOpacity style={stylesConfig.button} onPress={handleSave}>
        <Text style={stylesConfig.buttonText}>Save</Text>
      </TouchableOpacity>
      {/* <HashRateModal
  visible={showHashRateModal}
  hashRate={hashRate}
  onClose={() => setShowHashRateModal(false)}
/> */}

    </View>
  );
};

export default MinerConfig;

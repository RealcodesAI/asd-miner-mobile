import { getLicenseStore } from "@/lib/zustand/getLicense";
import { useMinerStore } from "@/lib/zustand/miner";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsdApi } from "@/lib/api/service/asdApi";
import LicenseModal from "./LicenseModal";
import { getUserStore } from "@/lib/zustand/getUser";
import LoadingModal from "./LoadingModal";
import { stylesConfig } from "@/app/css/styles/StylesConfig";
import showToast from "@/lib/utils/toastService";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import MiningPool from "./MinerItem/MiningPool";
import RewardThreshold from "./MinerItem/RewardThreshold";
import RewardWallet from "./MinerItem/RewardWallet";
import MinerLicense from "./MinerItem/MinerLicense";
import MinerName from "./MinerItem/MinerName";

const MinerConfig = () => {
  const {
    walletAddress,
    minerLicense,
    minerName,
    hashRate,
    isConfigured,
    setId,
    setWalletAddress,
    setMinerLicense,
    setMinerName,
    saveMinerConfig,
    loadMinerConfig,
  } = useMinerStore();
  const { getUserWallet, userWallet } = getUserStore();
  const router = useRouter();
  const { getLicense, getMinerMine, licenses, minerMine } = getLicenseStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
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
    setIsSaved(true);
    setIsLoading(true);
    const miner = minerMine.find((miner) => miner.license === minerLicense);
    if (miner && miner.id) {
      if (miner.name !== minerName) {
        // Nếu đổi tên, gọi API updateNameLicense
        try {
          setIsLoading(false);
          await AsdApi.updateNameLicense(minerName, miner.id);
          await getMinerMine();
          showToast("Miner name updated successfully!", "success");
          // Cập nhật lại dữ liệu vào AsyncStorage
          const minerData = {
            walletAddress,
            minerLicense,
            minerName,
            id: miner.id,
            isConfigured: true,
            hashRate: miner.hashRate,
          };
          await SecureStore.setItemAsync(
            "minerConfig",
            JSON.stringify(minerData)
          );
          console.log("Updated miner name locally:", minerData);
          router.push("/(tabs)/Miner");
        } catch (err: any) {
          console.log("Error updating miner name:", err);
          showToast(err.message, "danger");
        }
      } else {
        setIsLoading(false);
        // Nếu không đổi, chỉ lưu vào local storage
        setId(miner.id);
        setMinerName(miner.name);
        const minerData = {
          walletAddress,
          minerLicense,
          minerName,
          id: miner.id,
          isConfigured: true,
          hashRate: miner.hashRate,
        };
        await SecureStore.setItemAsync(
          "minerConfig",
          JSON.stringify(minerData)
        );
        console.log("Saved minerData locally:", minerData);
        showToast("Miner configuration saved successfully!", "success");
        router.push("/(tabs)/Miner");
      }
    } else {
      // Nếu thiếu thông tin, gọi saveMinerConfig
      await saveMinerConfig();
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (userWallet?.walletAddress) {
      console.log(userWallet?.walletAddress);
      setWalletAddress(userWallet?.walletAddress);
      setIsSaved(true);
    }
  }, [userWallet]);

  useEffect(() => {
    loadMinerConfig();
    getLicense();
    getMinerMine();
    getUserWallet();
  }, []);
  return (
    <View style={stylesConfig.container}>
      <View style={stylesConfig.content}>
        {/* Miner License */}
        <MinerLicense
          minerLicense={minerLicense}
          setMinerLicense={setMinerLicense}
          maskText={maskText}
        />

        {/*Miner name*/}
        <MinerName minerName={minerName} setMinerName={setMinerName} />
        {/* Reward Wallet */}
        <RewardWallet
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          maskText={maskText}
        />

        {/* Reward Threshold */}
        <RewardThreshold />

        {/*Mining Pool  */}
        <MiningPool />

        <TouchableOpacity style={stylesConfig.button} onPress={handleSave}>
          <Text style={stylesConfig.buttonText}>Save Configuration</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MinerConfig;

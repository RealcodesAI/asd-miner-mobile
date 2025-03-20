
import { getLicenseStore } from "@/lib/zustand/getLicense";
import { useMinerStore } from "@/lib/zustand/miner";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsdApi } from "@/lib/api/service/asdApi";
import LicenseModal from "./LicenseModal";
import { getUserStore } from "@/lib/zustand/getUser";
import LoadingModal from "./LoadingModal";
import { stylesConfig } from "@/app/css/styles/StylesConfig";
import showToast from "@/lib/utils/toastService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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
  const {getUserWallet, userWallet} =getUserStore()
  const router = useRouter()
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
    const miner = minerMine.find(miner => miner.license === minerLicense);
    if (miner && miner.id) {
      if (miner.name !== minerName) {
        // Nếu đổi tên, gọi API updateNameLicense
        try {
          await AsdApi.updateNameLicense(minerName, miner.id);
          await getMinerMine()
          showToast("Miner name updated successfully!", "success")
          // Cập nhật lại dữ liệu vào AsyncStorage
          const minerData = { walletAddress, minerLicense, minerName, id: miner.id, isConfigured: true, hashRate: miner.hashRate };
          await AsyncStorage.setItem("minerConfig", JSON.stringify(minerData));
          console.log("Updated miner name locally:", minerData);
          router.push("/(tabs)/Miner");
        } catch (err: any) {
          console.log("Error updating miner name:", err);
          showToast(err.message, "danger")
        }
      } else {
        setIsLoading(true);
        // Nếu không đổi, chỉ lưu vào local storage
        setId(miner.id);
        setMinerName(miner.name)
        const minerData = { walletAddress, minerLicense, minerName, id: miner.id, isConfigured: true, hashRate: miner.hashRate };
        await AsyncStorage.setItem("minerConfig", JSON.stringify(minerData));
        console.log("Saved minerData locally:", minerData);
        showToast("Miner configuration saved successfully!", "success")
        router.push("/(tabs)/Miner");
      }
    } else {
      // Nếu thiếu thông tin, gọi saveMinerConfig
      await saveMinerConfig();
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if(userWallet?.walletAddress) {
      console.log(userWallet?.walletAddress)
      setWalletAddress(userWallet?.walletAddress)
      setIsSaved(true);
    }
  }, [userWallet])

  useEffect(() => {
    loadMinerConfig();
    getLicense();
    getMinerMine();
    getUserWallet()
  }, []);

  return (
    <View style={stylesConfig.containerConfig}>
      <Text style={stylesConfig.title}>Configure your miner</Text>
      <Text style={stylesConfig.note}>
        Note: you can only configure your miner once!
      </Text>

      <Text style={stylesConfig.label}>Wallet Address</Text>
      <TextInput
        style={[stylesConfig.input, isSaved && stylesConfig.disabledInput]}
        value={maskText(walletAddress)}
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
      {isLoading && <LoadingModal visible={isLoading} hashRate={hashRate} setVisible={setIsLoading}/>}

   </View>
  );
};

export default MinerConfig;

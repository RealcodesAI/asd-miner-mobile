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
import { getPoolStore } from "@/lib/zustand/getPool";
import { useWithdrawHistories } from "@/lib/zustand/useWithdrawHistories";
import { updateWallteStore } from "@/lib/zustand/updateWallet";

const MinerConfig = () => {
  const {
    minerLicense,
    minerName,
    hashRate,
    isConfigured,
    setId,
    setMinerLicense,
    setMinerName,
    saveMinerConfig,
    loadMinerConfig,
  } = useMinerStore();
  const { getUserWallet, userWallet } = getUserStore();
  const { walletAddress, setWalletAddress, updateWallteAddress } =
    updateWallteStore();
  const { threshold, setThreshold, updateRewardThreshold } =
    useWithdrawHistories();
  const { getPool, pools } = getPoolStore();
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

  const getSelectedPool = () => {
    const poolId = minerMine.find(
      (miner) => miner.license === minerLicense
    )?.poolId;
    return pools?.find((pool) => pool.id === poolId);
  };

  const handleSave = async () => {
    let isConfiguredLocal = isConfigured;
    let minerIdLocal: string | number | undefined;
    const miner = minerMine.find((miner) => miner.license === minerLicense);
    minerIdLocal = miner?.id;
    setId(minerIdLocal);

    // Update Wallet Address if it's new and no license is configured yet
    if (
      !isConfigured &&
      userWallet?.walletAddress &&
      walletAddress !== userWallet?.walletAddress
    ) {
      try {
        await updateWallteAddress();
        showToast("Wallet address updated successfully!", "success");
      } catch (error: any) {
        console.error("Error updating wallet address:", error);
        showToast(error.message, "danger");
        setIsLoading(false);
        return;
      }
    }
    // Update Reward Threshold
    if (threshold !== userWallet?.rewardThreshold) {
      try {
        await updateRewardThreshold();
        showToast("Reward threshold updated successfully!", "success");
      } catch (error: any) {
        console.error("Error updating reward threshold:", error);
        showToast(error.message, "danger");
        setIsLoading(false);
        return;
      }
    }
    // Handle Miner Configuration (Name update or initial save)
    if (minerIdLocal) {
      if (miner?.name !== minerName) {
        // Update Miner Name
        try {
          await AsdApi.updateNameLicense(minerName, minerIdLocal);
          await getMinerMine();
          showToast("Miner name updated successfully!", "success");
        } catch (err: any) {
          console.log("Error updating miner name:", err);
          showToast(err.message, "danger");
          setIsLoading(false);
          return;
        }
      }
      // Update local storage after successful updates
      const minerData = {
        walletAddress,
        minerLicense,
        minerName,
        id: minerIdLocal,
        isConfigured: true,
        hashRate: miner?.hashRate,
      };
      await SecureStore.setItemAsync("minerConfig", JSON.stringify(minerData));
      console.log("Updated miner config locally:", minerData);
      isConfiguredLocal = true;
    } else if (minerLicense) {
      setIsLoading(true);
      // Save new miner configuration
      try {
        await saveMinerConfig();
        isConfiguredLocal = true;
        showToast("Miner configuration saved successfully!", "success");
      } catch (error: any) {
        console.error("Error saving miner config:", error);
        showToast(error.message, "danger");
        setIsLoading(false);
        return;
      }
    }
  };
  useEffect(() => {
    if (userWallet?.walletAddress) {
      console.log(userWallet?.walletAddress);
      setWalletAddress(userWallet?.walletAddress);
      setThreshold(userWallet?.rewardThreshold);
      setIsSaved(true);
    }
  }, [userWallet]);

  useEffect(() => {
    loadMinerConfig();
    getLicense();
    getMinerMine();
    getUserWallet();
    getPool();
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
        <RewardThreshold threshold={threshold} setThreshold={setThreshold} />

        {/*Mining Pool  */}
        {minerLicense && (
          <MiningPool initialPoolName={getSelectedPool()?.name} />
        )}

        {!minerLicense && <MiningPool />}

        <TouchableOpacity style={stylesConfig.button} onPress={handleSave}>
          <Text style={stylesConfig.buttonText}>Save Configuration</Text>
        </TouchableOpacity>
      </View>
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
      {isLoading && (
        <LoadingModal
          visible={isLoading}
          hashRate={hashRate}
          setVisible={setIsLoading}
        />
      )}
    </View>
  );
};

export default MinerConfig;

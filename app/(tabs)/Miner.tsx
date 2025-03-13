import React, { useState, useEffect, useRef } from "react";
import {View, Text, ScrollView, Image, TextStyle} from "react-native";
import Header from "@/components/Header/Header";
import { stylesMiner } from "@/app/(tabs)/styles/StylesMiner";
import MiningControls from "@/components/Miner/MiningControls";
import MiningProgress from "@/components/Miner/MiningProgress";
import MiningLog from "@/components/Miner/MiningLog";
import RewardDisplay from "@/components/Miner/RewardDisplay";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Miner = () => {
  const [miningPower, setMiningPower] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [miningLog, setMiningLog] = useState("");
  const [showReward, setShowReward] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // Thêm biến này

  const animationRef = useRef<any | null>(null);
  const logIntervalRef = useRef<any | null>(null);
  const isPaused = useRef(false);
  const logIndexRef = useRef(0);
  const apiIntervalRef = useRef<any | null>(null);

  const miningLogs = [
    "Header-hash:0fea9218cc8ff8775d1b3f9608bcfb0885f809df2f8b97af14fe2acfa488",
    "Mining on Fireal Smarthash",
    "0fea9218cc8ff8775d1b3f9608bcfb0885f809df2f8b97af14fe2a",
    "cf4885c2:149.8KH/S",
    "Block found! Nonce: 5c2f83a4d9",
    "Verifying block solution...",
    "Solution verified!",
    "Submitted block to network",
    "Block difficulty: 9218cc8ff8",
  ];

  // Gọi API ping miner
  const pingMinerAPI = async () => {
    try {
      const storedData = await AsyncStorage.getItem("minerConfig");
      let minerLicense = null;

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        minerLicense = parsedData.minerLicense;
      }

      if (!minerLicense) {
        console.warn("⚠️ Miner License không tồn tại!");
        return;
      }

      console.log("🔗 Miner License:", minerLicense);

      const response = await fetch(
        `https://miner.asdscan.ai/ping/${minerLicense}`
      );
      const data = await response.json();

      console.log("🔄 Ping API thành công:", data);
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
    }
  };

  // Gọi API mỗi 20s khi mining
  useEffect(() => {
    if (isMining) {
      pingMinerAPI();
      apiIntervalRef.current = setInterval(() => {
        pingMinerAPI();
      }, 20000);
    }

    return () => {
      if (apiIntervalRef.current) {
        clearInterval(apiIntervalRef.current);
        apiIntervalRef.current = null;
      }
    };
  }, [isMining]);

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      if (apiIntervalRef.current) clearInterval(apiIntervalRef.current);
    };
  }, []);

// Xử lý log mining
  useEffect(() => {
    if (isMining && !isCompleted) {
      setMiningLog(miningLogs[0]); // Bắt đầu với log đầu tiên
      let currentLogIndex = 0;

      logIntervalRef.current = setInterval(() => {
        if (!isPaused.current) {
          if (currentLogIndex < miningLogs.length - 1) {
            currentLogIndex++; // Tăng chỉ số lên để lấy log tiếp theo
            setMiningLog(miningLogs[currentLogIndex]);
          } else {
            clearInterval(logIntervalRef.current || 0); // Nếu hết log thì dừng lại
            logIntervalRef.current = null;
          }
        }
      }, 2800);
    }

    return () => {
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
        logIntervalRef.current = null;
      }
    };
  }, [isMining, isCompleted]);

  // Xử lý hiệu ứng thanh mining progress
  useEffect(() => {
    if (isMining) {
      setMiningPower(0);
      setShowReward(false);
      setIsCompleted(false); // Reset trạng thái khi bắt đầu mining
      isPaused.current = false;
      logIndexRef.current = 0;
      setMiningLog(miningLogs[0]);

      animationRef.current = setInterval(() => {
        if (!isPaused.current) {
          setMiningPower((prev) => {
            const newValue = prev + 0.5;

            if (newValue >= 100) {
              isPaused.current = true;
              setShowReward(true);
              setIsCompleted(true); // Đánh dấu đã đạt 100%

              // Không setMiningLog("") để giữ nguyên log cuối cùng

              setTimeout(() => {
                isPaused.current = false;
                setShowReward(false);
                setMiningPower(0);
                logIndexRef.current = 0;
                setIsCompleted(false); // Reset khi bắt đầu lại
                setMiningLog(miningLogs[0]); // Reset log về log đầu tiên
              }, 3000);

              return 100;
            }
            return newValue;
          });
        }
      }, 100);
    } else {
      if (animationRef.current) clearInterval(animationRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      if (apiIntervalRef.current) clearInterval(apiIntervalRef.current);
      setShowReward(false);
      setIsCompleted(false); // Reset nếu mining bị dừng
    }
  }, [isMining]);


  return (
    <ScrollView style={stylesMiner.container}>
      <Header title="Miner" />

      <Text style={stylesMiner.balance as TextStyle}>100.123 ASD</Text>
      <Image
        source={require("@/assets/images/Frame.png")}
        style={stylesMiner.image}
      />
      <MiningControls
        isMining={isMining}
        toggleMining={() => setIsMining(!isMining)}
      />

      <View style={stylesMiner.Container}>
        <View style={stylesMiner.sliderContainer}>
          <MiningProgress miningPower={miningPower} />
          <Text style={stylesMiner.hashRate as TextStyle}>
            Mining block... hash rate: 110000 H/S
          </Text>
          <MiningLog miningLog={miningLog} />
          <RewardDisplay showReward={showReward} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Miner;

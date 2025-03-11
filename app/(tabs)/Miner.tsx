import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import Header from '@/components/Header/Header';
import {stylesMiner} from "@/app/(tabs)/styles/StylesMiner";
import MiningControls from "@/components/Miner/MiningControls";
import MiningProgress from "@/components/Miner/MiningProgress";
import MiningLog from "@/components/Miner/MiningLog";
import RewardDisplay from "@/components/Miner/RewardDisplay";
import useMqtt, { publishMqttMessage } from "@/Hook/useMqtt";

const Miner = () => {
  const [miningPower, setMiningPower] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [miningLog, setMiningLog] = useState('');
  const [showReward, setShowReward] = useState(false);
  const animationRef = useRef<number | null>(null);
  const logIntervalRef = useRef<number | null>(null);
  const mqttIntervalRef = useRef<number | null>(null); // New ref for MQTT interval
  const isPaused = useRef(false);
  const logIndexRef = useRef(0);

  // Initialize MQTT
  useMqtt();

  const miningLogs = [
    "Header-hash:0fea9218cc8ff8775d1b3f9608bcfb0885f809df2f8b97af14fe2acfa488",
    "Mining on Fireal Smarthash",
    "0fea9218cc8ff8775d1b3f9608bcfb0885f809df2f8b97af14fe2a",
    "cf4885c2:149.8KH/S",
    "Block found! Nonce: 5c2f83a4d9",
    "Verifying block solution...",
    "Solution verified!",
    "Submitted block to network",
    "Hash difficulty: 9218cc8ff8"
  ];

  // MQTT topic
  const mqttTopic = "ping/ae454d585491c6641ddbadb5e1cc61463fd4e8b98534e8b9853a33dcce2c8a1f";

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
      if (mqttIntervalRef.current) {
        clearInterval(mqttIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMining) {
      setMiningLog(miningLogs[0]);

      logIntervalRef.current = setInterval(() => {
        if (!isPaused.current) {
          const randomLog = miningLogs[Math.floor(Math.random() * miningLogs.length)];
          setMiningLog(randomLog);
        } else {
          // Khi đạt 100%, xóa log
          setMiningLog('');
        }
      }, 2000);

      // Set up MQTT publishing every 20 seconds when mining
      mqttIntervalRef.current = setInterval(() => {
        if (!isPaused.current) {
          // Publish current mining status
          const message = "Mining";
          publishMqttMessage(mqttTopic, message);
        }
      }, 20000); // 20 seconds interval

      return () => {
        if (logIntervalRef.current) {
          clearInterval(logIntervalRef.current);
          logIntervalRef.current = null;
        }
        if (mqttIntervalRef.current) {
          clearInterval(mqttIntervalRef.current);
          mqttIntervalRef.current = null;
        }
      };
    }
  }, [isMining]);

  useEffect(() => {
    if (isMining) {
      setMiningPower(0);
      setShowReward(false);
      isPaused.current = false;
      logIndexRef.current = 0;
      setMiningLog(miningLogs[0]);

      animationRef.current = setInterval(() => {
        if (!isPaused.current) {
          setMiningPower(prev => {
            const newValue = prev + 0.5; // Chạy chậm hơn, mỗi lần chỉ tăng 0.5%

            // Nếu đạt 100%, tạm dừng 5 giây trước khi reset
            if (newValue >= 100) {
              isPaused.current = true;
              setShowReward(true); // Hiển thị phần thưởng khi đạt 100%
              setMiningLog(''); // Xóa log khi đạt 100%

              // Sau 2 giây, reset về 0% và tiếp tục
              setTimeout(() => {
                isPaused.current = false;
                setShowReward(false); // Ẩn phần thưởng
                setMiningPower(0);
                logIndexRef.current = 0; // Reset log index khi bắt đầu chu kỳ mới
                setMiningLog(miningLogs[0]); // Hiển thị log đầu tiên khi bắt đầu chu kỳ mới
              }, 3000);

              return 100;
            }
            return newValue;
          });
        }
      }, 100);
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
        logIntervalRef.current = null;
      }
      if (mqttIntervalRef.current) {
        clearInterval(mqttIntervalRef.current);
        mqttIntervalRef.current = null;
      }
      setMiningLog('');
      setShowReward(false);
    }
  }, [isMining]);

  const toggleMining = () => {
    setIsMining(!isMining);
  };

  return (
    <ScrollView style={stylesMiner.container}>
      <Header title="Miner"/>

      <Text style={stylesMiner.balance}>100.123 ASD</Text>
      <Image source={require('@/assets/images/Frame.png')} style={stylesMiner.image} />

      <MiningControls isMining={isMining} toggleMining={toggleMining} />

      <View style={stylesMiner.Container}>
        <View style={stylesMiner.sliderContainer}>
          <MiningProgress miningPower={miningPower} />

          <Text style={stylesMiner.hashRate}>
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
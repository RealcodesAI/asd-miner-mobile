import React, {useState, useEffect, useRef} from "react";
import {View, Text, ScrollView, Image, TextStyle} from "react-native";
import Header from "@/components/Header/Header";
import {stylesMiner} from "@/app/(tabs)/styles/StylesMiner";
import MiningControls from "@/components/Miner/MiningControls";
import MiningProgress from "@/components/Miner/MiningProgress";
import MiningLog from "@/components/Miner/MiningLog";
import RewardDisplay from "@/components/Miner/RewardDisplay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsdMiningRN from "asd-mining-rn"
import {useMinerReward} from "@/hooks/useMinerReward";
import {useMinerLicense} from "@/hooks/useMinerLicense";

// const miner = new AsdMiningRN('784f49cc5411df749e542ae938cb59e66bc0000019ce102474ee5fd82bc0dd30', 'https://be.asdscan.ai')
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
  const reward = useMinerReward();
  const minerLicense = useMinerLicense();
  const minerRef = useRef<AsdMiningRN | null>(null); // Giữ một instance duy nhất


  // useEffect(() => {
  //   miner.calculateHashRate(5000).then(console.log)
  //   miner.start(console.log)
  //   setTimeout(() => {
  //     miner.stop();
  //     console.log('Mining stopped after 1 minute');
  //   }, 60000);
  // }, []);
  // Hàm khởi tạo miner

  // Chỉ khởi tạo miner một lần
  useEffect(() => {
    if (!minerRef.current) {
      minerRef.current =AsdMiningRN.getInstance(String(minerLicense), "https://be.asdscan.ai");
    }
    return () => {
      minerRef.current?.stop(); // Dừng miner khi component unmount
      minerRef.current = null;
    };
  }, [minerLicense]);

  // Điều khiển start/stop mining
  useEffect(() => {
    if (minerRef.current) {
      if (isMining) {
        minerRef.current.start((log: string) => {
          setMiningLog(log); // Chỉ lưu log cuối cùng
        });
      } else {
        minerRef.current.stop();
      }
    }
  }, [isMining]);


  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    };
  }, []);


  // Xử lý hiệu ứng thanh mining progress
  useEffect(() => {
    if (isMining) {
      setMiningPower(0);
      setShowReward(false);
      setIsCompleted(false); // Reset trạng thái khi bắt đầu mining
      isPaused.current = false;
      logIndexRef.current = 0;

      animationRef.current = setInterval(() => {
        if (!isPaused.current) {
          setMiningPower((prev) => {
            const newValue = prev + 0.5;

            if (newValue >= 100) {
              isPaused.current = true;
              setShowReward(true);
              setIsCompleted(true); // Đánh dấu đã đạt 100%

              // Không setMiningLog("") để giữ nguyên log cuối cùng

                isPaused.current = false;
                setShowReward(false);
                setMiningPower(0);
                logIndexRef.current = 0;
                setIsCompleted(false); // Reset khi bắt đầu lại

              return 100;
            }
            return newValue;
          });
        }
      }, 100);
    } else {
      if (animationRef.current) clearInterval(animationRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      setShowReward(false);
      setIsCompleted(false); // Reset nếu mining bị dừng
    }
  }, [isMining]);


  return (
    <ScrollView style={stylesMiner.container}>
      <Header title="Miner"/>

      <Text style={stylesMiner.balance as TextStyle}>{(reward).toFixed(4)} ASD</Text>
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
          <MiningProgress miningPower={miningPower}/>
          <Text style={stylesMiner.hashRate as TextStyle}>
            Mining block... hash rate: 110000 H/S
          </Text>
          <MiningLog miningLog={miningLog}/>
          <RewardDisplay showReward={showReward}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default Miner;

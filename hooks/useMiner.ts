import { useState, useEffect, useRef } from "react";
import AsdMiningRN from "asd-mining";
import { useMinerStore } from "@/lib/zustand/miner";

export const useMiner = () => {
  const [miningPower, setMiningPower] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [miningLog, setMiningLog] = useState<string[]>([]); // Mảng chứa chỉ 1 phần tử mới nhất

  const { minerLicense } = useMinerStore();
  const minerRef = useRef(AsdMiningRN.getInstance(String(minerLicense), "https://be.asdscan.ai"));

  const toggleMining = () => {
    setIsMining((prev) => !prev);
  };

  useEffect(() => {
    if (!minerRef.current) return;

    if (isMining) {
      minerRef.current.start((progress, message) => {
        setMiningPower(progress); // Cập nhật % mining theo progress log

        if (message !== null) {
          setMiningLog([message]); // Luôn ghi đè, chỉ chứa log mới nhất
        }

        console.log(`Mining Progress: ${progress}`);
        console.log(`Mining Log: ${message}`);
      });
    } else {
      minerRef.current.stop();
    }

    return () => {
      if (minerRef.current) {
        minerRef.current.stop();
      }
    };
  }, [isMining]);

  return {
    miningPower,
    isMining,
    miningLog,
    toggleMining,
  };
};

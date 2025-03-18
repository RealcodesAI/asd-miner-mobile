import { useState, useEffect, useRef } from "react";
import AsdMiningRN from "asd-mining";
import { useMinerLicense } from "@/hooks/useMinerLicense";
import {useMinerStore} from "@/lib/zustand/miner";

export const useMiner = () => {
  const [miningPower, setMiningPower] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [miningLog, setMiningLog] = useState("");

  const {minerLicense} = useMinerStore();
  console.log("Miner License: ", minerLicense);
  const minerRef = useRef(AsdMiningRN.getInstance(String(minerLicense), "https://be.asdscan.ai"));

  const toggleMining = () => {
    setIsMining((prev) => !prev);
  };

  useEffect(() => {
    if (!minerRef.current) return;

    if (isMining) {
      minerRef.current.start((progress, message) => {
        setMiningPower(progress); // Cập nhật % mining theo progress log
        if(progress !== null) {
          setMiningLog(message);
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

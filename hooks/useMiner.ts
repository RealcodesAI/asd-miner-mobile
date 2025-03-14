import { useState, useEffect, useRef } from "react";
import AsdMiningRN from "asd-mining-rn";
import { useMinerReward } from "@/hooks/useMinerReward";
import { useMinerLicense } from "@/hooks/useMinerLicense";

export const useMiner = () => {
  const [miningPower, setMiningPower] = useState(0);
  const [isMining, setIsMining] = useState(false);
  const [miningLog, setMiningLog] = useState("");
  const [showReward, setShowReward] = useState(false);
  const animationRef = useRef<any | null>(null);
  const isPaused = useRef(false);
  const logIndexRef = useRef(0);

  const reward = useMinerReward();
  const minerLicense = useMinerLicense();
  const minerRef = AsdMiningRN.getInstance(String(minerLicense), "https://be.asdscan.ai");

  const toggleMining = () => {
    setIsMining((prev) => !prev);
  };

  useEffect(() => {
    if (minerRef) {
      if (isMining) {
        minerRef.start((log: string) => {
          setMiningLog(log)
          console.log(log)
        });
      } else {
        minerRef.stop();
      }
    }
  }, [isMining]);

  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (isMining) {
      setMiningPower(0);
      setShowReward(false);
      isPaused.current = false;
      logIndexRef.current = 0;

      animationRef.current = setInterval(() => {
        if (!isPaused.current) {
          setMiningPower((prev) => {
            const newValue = prev + 0.5;
            if (newValue >= 100) {
              isPaused.current = true;
              setShowReward(true);

              setTimeout(() => {
                isPaused.current = false;
                setShowReward(false);
                setMiningPower(0);
                logIndexRef.current = 0;
              }, 1000);

              return 100;
            }
            return newValue;
          });
        }
      }, 100);
    } else {
      if (animationRef.current) clearInterval(animationRef.current);
      setShowReward(false);
    }
  }, [isMining]);

  return {
    miningPower,
    isMining,
    miningLog,
    showReward,
    reward,
    toggleMining
  };
};

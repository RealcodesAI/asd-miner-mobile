import React from "react";
import { View, Text, Image } from "react-native";
import { useMinerReward } from "@/hooks/useMinerReward";
import { stylesMiner } from "@/app/css/styles/StylesMiner";
import { useMinerStore } from "@/lib/zustand/miner";
import { useMinerHashRate } from "@/hooks/useMinerHashRate";

const MinerBalance: React.FC = () => {
  const reward = useMinerReward();
  const { minerName } = useMinerStore();
  const minerHashRate = useMinerHashRate();

  return (
    <View style={stylesMiner.statsContainer}>
      <View style={stylesMiner.statBox}>
        <View style={stylesMiner.containerImage}>
          <Image
            source={require("../../assets/icon/Thunder.png")}
            style={stylesMiner.image}
          />
          <Text style={stylesMiner.statLabel}>Hashrate</Text>
        </View>
        <Text style={stylesMiner.statValue}>{minerHashRate} MH/s</Text>
      </View>
      <View style={stylesMiner.statBox}>
        <View style={stylesMiner.containerImage}>
          <Image
            source={require("../../assets/icon/Group.png")}
            style={stylesMiner.image}
          />
          <Text style={stylesMiner.statLabel}>Rewards</Text>
        </View>
        <Text style={stylesMiner.statValue}>{reward?.toFixed(3)} ASD</Text>
      </View>
      <View style={stylesMiner.statBox}>
        <View style={stylesMiner.containerImage}>
          <Image
            source={require("../../assets/icon/time-clock.png")}
            style={stylesMiner.image}
          />
          <Text style={stylesMiner.statLabel}>Uptime</Text>
        </View>
        <Text style={stylesMiner.statValue}>00:00:00</Text>
      </View>
      <View style={stylesMiner.statBox}>
        <View style={stylesMiner.containerImage}>
          <Image
            source={require("../../assets/icon/Profile.png")}
            style={stylesMiner.image}
          />
          <Text style={stylesMiner.statLabel}>Miner Name</Text>
        </View>
        <Text style={stylesMiner.statValue}>{minerName}</Text>
      </View>
    </View>
  );
};

export default MinerBalance;

import {View, Text, Dimensions, ToastAndroid} from "react-native";
import React, {useEffect, useState} from "react";
import { LineChart } from "react-native-chart-kit";
import { stylesHistory } from "@/app/(tabs)/styles/StylesHistory";
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import {AsdApi} from "@/lib/api/service/asdApi";

const screenWidth = Dimensions.get("window").width;
const chartHeight = 250;
const ChartHistory = () => {
  const [reward, setReward] = useState(0);
  useEffect(() => {
    const response = async () => {
      try {
        const response = await AsdApi.getMiner(5);
        setReward(Number((response.reward).toFixed(4)));
      } catch (error: any) {
        ToastAndroid.show(`Failed to fetch rewards: ${error.message}`, ToastAndroid.SHORT);
        console.error("Failed to fetch rewards:", error);
      }
    }
    response();
  }, []);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number;
  } | null>(null);

  return (
    <View>
      <View>
        <Text style={stylesHistory.chartLabel}>Current Reward</Text>
        <Text style={stylesHistory.chartValue}>{(reward).toFixed(4)} ASD</Text>
      </View>

      <View style={{ position: "relative" }}>
        <LineChart
          data={{
            labels: ["1h", "2h", "2h30", "3h", "4h", "5h"],
            datasets: [
              {
                data: [500, 1000, 1200, 1700, 1500, 1600],
                color: () => "#FFD700",
                strokeWidth: 3,
              },
              {
                data: [800, 1200, 1000, 2200, 2800, 3500],
                color: () => "#00FF00",
                strokeWidth: 3,
              },
            ],
          }}
          width={screenWidth}
          height={250}
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: "#000",
            backgroundGradientTo: "#000",
            decimalPlaces: 0,
            color: () => "#FFF",
            labelColor: () => "#FFF",
            propsForLabels: {
              fontSize: 15,
              fontFamily: "Roboto",
            },
            propsForDots: {
              r: "3", // Ẩn tất cả các chấm tròn mặc định
              strokeWidth: "1",
            },
            propsForBackgroundLines: {
              display: "none",
            },
            formatYLabel: (value) => {
              const yLabels = [0, 1000, 1500, 2000, 2500, 3000, 3500, 4000]; // Danh sách số mong muốn
              return yLabels.includes(parseInt(value)) ? value : ""; // Ẩn các số không mong muốn
            },
          }}
          bezier
          style={stylesHistory.chart}
          onDataPointClick={({ x, y, value }) => {
            setTooltip({ x, y, value });
          }}
          yAxisInterval={1}
        />

        {tooltip && (
          <Svg
            style={{
              position: "absolute",
              left: Math.max(tooltip.x - 30, 10), // Giữ trong giới hạn
              top: tooltip.y - 10, // Đưa bóng lên đúng vị trí
              width: 80,
              height: (chartHeight - tooltip.y),
            }}
            viewBox={`0 0 80 ${chartHeight - tooltip.y}`}
          >
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="10%" stopColor="#121212" stopOpacity="2" />
                <Stop offset="100%" stopColor="#FFD335" stopOpacity="1"/>
              </LinearGradient>
            </Defs>
            {/* Bóng vàng mờ */}
            <Path
              d={`
                M 25,20 
                A 15,15 0 0 1 65,20
                L 65,${chartHeight - tooltip.y - 26} 
                L 25,${chartHeight - tooltip.y - 26} 
                Z
              `}
              fill="url(#grad)"
              opacity="0.75"
            />

            {/* Chấm tròn trắng */}
            <Circle
              cx="45"
              cy="20"
              r="8"
              fill="#000"
              stroke="#fff"
              strokeWidth="5"
            />
          </Svg>
        )}

        {/* Tooltip hiển thị ngay trên chấm tròn */}
        {tooltip && (
          <View
            style={{
              position: "absolute",
              left: tooltip.x - 30,
              top: tooltip.y - 43,
              backgroundColor: "#FFF",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#000",
                fontWeight: "500",
                fontSize: 12,
                fontFamily: "Roboto",
              }}
            >
              {tooltip.value} ASD
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChartHistory;

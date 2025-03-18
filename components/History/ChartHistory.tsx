import { View, Text, Dimensions, ToastAndroid, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { useMinerReward } from "@/hooks/useMinerReward";
import { getChartStore } from "@/lib/zustand/getChart";
import { format, parseISO } from "date-fns";
import { stylesHistory } from "@/app/css/styles/StylesHistory";
import { useMinerStore } from "@/lib/zustand/miner";

const screenWidth = Dimensions.get("window").width;
const chartHeight = 250;
const ChartHistory = () => {
  const reward = useMinerReward();
  const { getChart, chart } = getChartStore();
  const {id} = useMinerStore()
  console.log(id)
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number;
  } | null>(null);
  useEffect(() => {
    getChart();
  }, []);

  const hasData = chart && chart.data && chart.data.length > 0;
  // Chuyển đổi dữ liệu API thành format của LineChart
  const chartData = hasData
    ? {
        labels: chart.data.map((item) => format(parseISO(item.timeInterval), "dd/MM")), // Mốc thời gian
        datasets: [
          {
            data: chart.data.map((item) => parseFloat(Number(item.totalReward).toFixed(4))), // Giá trị totalReward
            color: () => "#FFD700", // Màu vàng
            strokeWidth: 3,
          },
        ],
      }
    : {
        labels: ["No Data"],
        datasets: [{ data: [0] }],
      };
  return (
    <Pressable onPress={() => setTooltip(null)} style={{ flex: 1 }}>
      <View>
        <Text style={stylesHistory.chartLabel}>Current Reward</Text>
        <Text style={stylesHistory.chartValue}>{reward.toFixed(4)} ASD</Text>
      </View>

      <View style={{ position: "relative" }}>
        <LineChart
          data={chartData}
          width={screenWidth}
          height={250}
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: "#000",
            backgroundGradientTo: "#000",
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
          }}
          // bezier
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
              left: Math.max(tooltip.x - 45), // Giữ trong giới hạn
              top: tooltip.y - 10, // Đưa bóng lên đúng vị trí
              width: 80,
              height: chartHeight - tooltip.y,
            }}
            viewBox={`0 0 80 ${chartHeight - tooltip.y}`}
          >
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="10%" stopColor="#121212" stopOpacity="2" />
                <Stop offset="100%" stopColor="#FFD335" stopOpacity="1" />
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
              left: tooltip.x - 43,
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
    </Pressable>
  );
};

export default ChartHistory;

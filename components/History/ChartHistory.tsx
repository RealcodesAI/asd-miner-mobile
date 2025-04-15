import { View, Text, Dimensions, Pressable } from "react-native";
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
import { format, isAfter, parseISO, subDays } from "date-fns";
import { stylesHistory } from "@/app/css/styles/StylesHistory";
import { useMinerStore } from "@/lib/zustand/miner";

const screenWidth = Dimensions.get("window").width;
const chartHeight = 250;
const ChartHistory = () => {
  const reward = useMinerReward();
  const { getChart, chart } = getChartStore();
  const { id } = useMinerStore();
  const last7Days = subDays(new Date(), 7);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number;
  } | null>(null);
  useEffect(() => {
    if (!id) return;
    setTooltip(null);
    getChart();
    const interval = setInterval(() => {
      getChart();
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  const hasData = chart && chart.data && chart.data.length > 0;
  // Chuyển đổi dữ liệu API thành format của LineChart
  const filteredData = hasData
    ? chart.data.filter((item) =>
        isAfter(parseISO(item.timeInterval), last7Days)
      )
    : [];
  const chartData =
    filteredData.length > 0
      ? {
          labels: filteredData.map((item) =>
            format(parseISO(item.timeInterval), "dd-MM")
          ),
          datasets: [
            {
              data: filteredData.map((item) =>
                parseFloat(Number(item.totalReward).toFixed(3))
              ),
              color: () => "#FFD700",
              strokeWidth: 3,
              withDots: true,
            },
          ],
        }
      : {
          labels: ["No Data"],
          datasets: [{ data: [0] }],
        };

  const handleDataPointClick = ({ x, y, value }: any) => {
    console.log(x, y, value);
    setTooltip({ x, y, value });
  };
  return (
    <View style={[stylesHistory.card, {position: "relative"}]}>
      <Text style={stylesHistory.sectionLabel}>Mining Performance</Text>
      <Text style={stylesHistory.subLabel}>Hashrate and rewards over time</Text>
      <View style={{ position: "relative" }} pointerEvents="box-none">
        <LineChart
          data={
            id ? chartData : { labels: ["No Data"], datasets: [{ data: [0] }] }
          }
          width={screenWidth -50}
          height={chartHeight}
          fromZero
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "transparent",
            backgroundGradientTo: "transparent",
            color: () => "#FFF",
            labelColor: () => "#FFF",
            propsForLabels: {
              fontSize: 10,
              fontFamily: "Roboto",
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
            },
            propsForBackgroundLines: {
              display: "none",
            },
          }}
          bezier
          style={stylesHistory.chart}
          onDataPointClick={handleDataPointClick}
        />

        {/* Custom Tooltip */}
        {tooltip && (
          <>
            <Svg
              style={{
                position: "absolute",
                left: Math.max(tooltip.x - 45, 10),
                top: tooltip.y - 10,
                width: 80,
                height: chartHeight - tooltip.y,
              }}
              viewBox={`0 0 80 ${chartHeight - tooltip.y}`}
            >
              <Defs>
                <LinearGradient id="grad-shadow" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="10%" stopColor="#121212" stopOpacity="2" />
                  <Stop offset="100%" stopColor="#FFD335" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Path
                d={`
                  M 25,20 
                  A 15,15 0 0 1 65,20
                  L 65,${chartHeight - tooltip.y - 26} 
                  L 25,${chartHeight - tooltip.y - 26} 
                  Z
                `}
                fill="url(#grad-shadow)"
                opacity="0.75"
              />
              <Circle
                cx="45"
                cy="20"
                r="8"
                fill="#000"
                stroke="#fff"
                strokeWidth="6"
              />
            </Svg>

            <View
              style={[
                {
                  left: tooltip.x - 38,
                  top: tooltip.y - 40,
                },
                stylesHistory.containerTooltip,
              ]}
            >
              <Text style={stylesHistory.textTooltip}>{tooltip.value} ASD</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ChartHistory;

import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { stylesHistory } from "@/app/(tabs)/styles/StylesHistory";

const screenWidth = Dimensions.get("window").width;

const ChartHistory = () => {
  return (
    <>
      <View>
        <Text style={stylesHistory.chartLabel}>Current Reward</Text>
        <Text style={stylesHistory.chartValue}>100.123 ASD</Text>
      </View>
      <LineChart
        data={{
          labels: ["1h", "2h", "2h30", "3h", "4h", "5h"],
          datasets: [
            {
              data: [500, 1000, 1200, 2000, 2500, 3000],
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
        width={Dimensions.get("window").width }
        height={250}
        chartConfig={{
          backgroundGradientFrom: "#000",
          backgroundGradientTo: "#000",
          decimalPlaces: 0,
          color: () => "#FFF",
          labelColor: () => "#FFF",
          propsForLabels: {
            fontSize: 15,
            fontFamily: "Roboto"
          },
          propsForDots: {
            r: "3.5",
            strokeWidth: "1",
            // stroke: "#FFF",
          },
          propsForBackgroundLines: {
            display: "none",
          },
        }}
        bezier
        style={stylesHistory.chart}
      />
    </>
  );
};

export default ChartHistory;

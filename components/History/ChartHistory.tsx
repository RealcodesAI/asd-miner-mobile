import { stylesHistory } from '@/app/css/styles/StylesHistory';
import { getChartStore } from '@/lib/zustand/getChart';
import { useMinerStore } from '@/lib/zustand/miner';
import { format, isAfter, parseISO, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {  View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const chartHeight = 230;

const chartConfig = {
  backgroundColor:'#1c1c1e',
  backgroundGradientFrom: '#1c1c1e',
  backgroundGradientTo: '#1c1c1e',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 0.8) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: '2',
  },
  propsForLabels: {
    fontSize: 9,
    fontFamily: "Lexend",
    fontWeight: "500",
  },
};

const ChartHistory = () => {
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    yHashrate: number;
    yRewards: number;
    label: string | null;
  } | null>(null);
  const { getChart, chart } = getChartStore();
  const { id } = useMinerStore();
  const last7Days = subDays(new Date(), 7);

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
                parseFloat(Number(item.totalHashRate).toFixed(0))
              ),
              color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
              strokeWidth: 3,
            },
            {
              data: filteredData.map((item) =>
                parseFloat(Number(item.totalReward).toFixed(3))
              ),
              color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
              strokeWidth: 3,
            },
          ],
        }
      : {
          labels: ["No Data"],
          datasets: [{ data: [0] }],
        };

  const handleDataPointClick = ({ x, y, index, value, dataset }: any) => {
    const yRewards = dataset.index === 1 ? value : chartData.datasets[1].data[index];
    const yHashrate = dataset.index === 0 ? value : chartData.datasets[0].data[index];
    setTooltip({
      x: x,
      y: y,
      yRewards: yRewards,
      yHashrate: yHashrate,
      label: chartData.labels[index],
    });
  };
  return (
    <View style={stylesHistory.card}>
      <Text style={stylesHistory.sectionLabel}>Mining Performance</Text>
      <Text style={stylesHistory.subLabel}>Hashrate and rewards over time</Text>

      <View style={{ position: 'relative' }}>
        <LineChart
          data={chartData}
          width={width * 0.8}
          height={chartHeight}
          chartConfig={chartConfig}
          bezier
          style={stylesHistory.chart}
          onDataPointClick={handleDataPointClick}
        />

{tooltip && (
  <>
    {/* Circle: hiển thị đúng điểm chạm */}
    <Svg
      style={{
        position: 'absolute',
        left: tooltip.x -8,
        top: tooltip.y + 10,
      }}
      width={16}
      height={16}
    >
      <Circle
        r={3}
        cx={8}
        cy={8}
        fill="rgba(63, 81, 181, 1)"
        stroke="#fff"
        strokeWidth={1}
      />
    </Svg>

    {/* Tooltip box */}
    <View
      style={[
        stylesHistory.tooltipContainer,
        {
          left: tooltip.x -50,
          top: tooltip.y -40,
        },
      ]}
    >
      <Text style={stylesHistory.tooltipLabel}>Hashrate: {tooltip.yHashrate}</Text>
      <Text style={stylesHistory.tooltipLabel}>Rewards: {tooltip.yRewards} ASD</Text>
    </View>
  </>
)}

      </View>

      <View style={stylesHistory.legendContainer}>
        <View style={stylesHistory.legendItem}>
          <View style={[stylesHistory.legendColor, { backgroundColor: chartData.datasets[0]?.color() }]} />
          <Text style={stylesHistory.legendText}>Hashrate</Text>
        </View>
        <View style={stylesHistory.legendItem}>
          <View style={[stylesHistory.legendColor, { backgroundColor: chartData.datasets[1]?.color() }]} />
          <Text style={stylesHistory.legendText}>Rewards</Text>
        </View>
      </View>
    </View>
  );
};

export default ChartHistory;

import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { getChartStore } from '@/lib/zustand/getChart';
import { format, isAfter, parseISO, subDays } from 'date-fns';
import { stylesHistory } from '@/app/css/styles/StylesHistory';
import { useMinerStore } from '@/lib/zustand/miner';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import { Chart } from './Chart/Chart';
import { Legend } from './Chart/Legend';

const { width } = Dimensions.get('window');
const chartWidth = width * 0.83;
const chartHeight = 230;
const verticalPadding = 30;
const horizontalPadding = 40;
const tooltipWidth = 130;
const tooltipHeight = 60;
const tooltipRadius = 5;
interface ChartDataItem {
  timeInterval: string;
  totalHashRate: string;
  totalReward: string;
}

const ChartHistory = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ hashrate: number | string, rewards: number | string, date: string } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { getChart, chart } = getChartStore();
  const { id } = useMinerStore();
  const last7Days = subDays(new Date(), 7);

  useEffect(() => {
    if (!id) return;
    setTooltipData(null);
    getChart();
    const interval = setInterval(() => {
      getChart();
    }, 10000);

    return () => clearInterval(interval);
  }, [id, getChart]);

  const filteredChartData: ChartDataItem[] = (chart?.data as ChartDataItem[])?.filter(item =>
    isAfter(parseISO(item.timeInterval), last7Days)
  ) || [];

  const yHashrateMax = filteredChartData.length > 0 ? Math.max(...filteredChartData.map(item => parseFloat(item.totalHashRate))) : 0;
  const yRewardsMax = filteredChartData.length > 0 ? Math.max(...filteredChartData.map(item => parseFloat(item.totalReward))) : 0;

  const xScale = d3Scale.scalePoint()
    .domain(filteredChartData.map(item => format(parseISO(item.timeInterval), 'dd/MM')))
    .range([horizontalPadding, chartWidth - horizontalPadding]);

  const yScaleHashrate = d3Scale.scaleLinear()
    .domain([0, yHashrateMax * 1.2])
    .range([chartHeight - verticalPadding, verticalPadding]);

  const yScaleRewards = d3Scale.scaleLinear()
    .domain([0, yRewardsMax * 1.5])
    .range([chartHeight - verticalPadding, verticalPadding]);

  const lineHashrate = d3Shape.line()
    .x((d: any) => xScale(format(parseISO(d.timeInterval), 'dd/MM')))
    .y((d: any) => yScaleHashrate(parseFloat(d.totalHashRate)))
    .curve(d3Shape.curveBasis);

  const lineRewards = d3Shape.line()
    .x((d: any) => xScale(format(parseISO(d.timeInterval), 'dd/MM')))
    .y((d: any) => yScaleRewards(parseFloat(d.totalReward)))
    .curve(d3Shape.curveBasis);

  const handleTouch = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    let closestIndex = -1;
    let minDistance = Infinity;

    filteredChartData.forEach((item, index) => {
      const dateFormatted = format(parseISO(item.timeInterval), 'dd/MM');
      const x = xScale(dateFormatted);
      const yHash = yScaleHashrate(parseFloat(item.totalHashRate));
      const yRew = yScaleRewards(parseFloat(item.totalReward));

      const distHash = Math.sqrt((locationX - x) ** 2 + (locationY - yHash) ** 2);
      const distRew = Math.sqrt((locationX - x) ** 2 + (locationY - yRew) ** 2);

      if (distHash < minDistance) {
        minDistance = distHash;
        closestIndex = index;
        setTooltipPosition({ x, y: yHash });
      }
      if (distRew < minDistance && distRew < distHash) {
        minDistance = distRew;
        closestIndex = index;
        setTooltipPosition({ x, y: yRew });
      }
    });

    if (closestIndex !== -1 && minDistance < 30) {
      const selectedData = filteredChartData[closestIndex];
      if (selectedData) {
        setTooltipData({
          hashrate: parseFloat(selectedData.totalHashRate),
          rewards: parseFloat(selectedData.totalReward).toFixed(3),
          date: format(parseISO(selectedData.timeInterval), 'dd/MM'),
        });
        setTooltipVisible(true);
      } else {
        setTooltipVisible(false);
      }
    } else {
      setTooltipVisible(false);
    }
  };

  return (
    <View style={[stylesHistory.card, { position: "relative" }]}>
      <Text style={stylesHistory.sectionLabel}>Mining Performance</Text>
      <Text style={stylesHistory.subLabel}>Hashrate and rewards over time</Text>

      <View>
        <Chart
          chartWidth={chartWidth}
          chartHeight={chartHeight}
          verticalPadding={verticalPadding}
          horizontalPadding={horizontalPadding}
          filteredChartData={filteredChartData}
          yHashrateMax={yHashrateMax}
          yRewardsMax={yRewardsMax}
          xScale={xScale}
          yScaleHashrate={yScaleHashrate}
          yScaleRewards={yScaleRewards}
          lineHashrate={lineHashrate}
          lineRewards={lineRewards}
          tooltipVisible={tooltipVisible}
          tooltipData={tooltipData}
          tooltipPosition={tooltipPosition}
          tooltipWidth={tooltipWidth}
          tooltipHeight={tooltipHeight}
          tooltipRadius={tooltipRadius}
          handleTouch={handleTouch}
          setTooltipVisible={setTooltipVisible}
        />
        <Legend />
      </View>
    </View>
  );
};

export default ChartHistory;
import React from 'react';
import Svg, { Path, Circle, Text as SvgText, Rect } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import { format, parseISO } from 'date-fns';
import { Tooltip } from './Tooltip';
import { formatHashrateExponent } from '@/lib/utils/formatHashrate';

interface ChartProps {
  chartWidth: number;
  chartHeight: number;
  verticalPadding: number;
  horizontalPadding: number;
  filteredChartData: ChartDataItem[];
  yHashrateMax: number;
  yRewardsMax: number;
  xScale: d3Scale.ScalePoint<string>;
  yScaleHashrate: d3Scale.ScaleLinear<number, number, never>;
  yScaleRewards: d3Scale.ScaleLinear<number, number, never>;
  lineHashrate: d3Shape.Line<[number, number]>;
  lineRewards: d3Shape.Line<[number, number]>;
  tooltipVisible: boolean;
  tooltipData: { hashrate: number | string, rewards: number | string, date: string } | null;
  tooltipPosition: { x: number; y: number };
  tooltipWidth: number;
  tooltipHeight: number;
  tooltipRadius: number;
  handleTouch: (event: any) => void;
  setTooltipVisible: (visible: boolean) => void;
}
interface ChartDataItem {
    timeInterval: string;
    totalHashRate: string;
    totalReward: string;
  }

export const Chart: React.FC<ChartProps> = ({
  chartWidth,
  chartHeight,
  verticalPadding,
  horizontalPadding,
  filteredChartData,
  yHashrateMax,
  yRewardsMax,
  xScale,
  yScaleHashrate,
  yScaleRewards,
  lineHashrate,
  lineRewards,
  tooltipVisible,
  tooltipData,
  tooltipPosition,
  tooltipWidth,
  tooltipHeight,
  tooltipRadius,
  handleTouch,
  setTooltipVisible,
}) => {
  return (
    <Svg
      width={chartWidth}
      height={chartHeight}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={() => setTooltipVisible(false)}
    >
      {/* Background Grid (Optional) */}
      {yScaleHashrate.ticks(3).map((tick: number, index: number) => (
        <SvgText
          key={`y-tick-${index}`}
          x={horizontalPadding - 10}
          y={yScaleHashrate(tick) + 5}
          fontSize={10}
          fill="#555"
          textAnchor="end"
        >
          {formatHashrateExponent(tick)}
        </SvgText>
      ))}
      {yScaleRewards.ticks(3).map((tick: number, index: number) => (
        <SvgText
          key={`y-tick-right-${index}`}
          x={chartWidth - horizontalPadding + 10}
          y={yScaleRewards(tick) + 5}
          fontSize={10}
          fill="#555"
          textAnchor="start"
        >
          {tick}
        </SvgText>
      ))}
      {xScale.domain().map((date: string, index: number) => (
        <SvgText
          key={`x-tick-${index}`}
          x={xScale(date)}
          y={chartHeight - 10}
          fontSize={10}
          fill="#555"
          textAnchor="middle"
        >
          {date}
        </SvgText>
      ))}

      {/* Hashrate Line */}
      {filteredChartData.length > 1 && (
        <Path
          d={lineHashrate(filteredChartData)}
          fill="none"
          stroke="#646AFF"
          strokeWidth={2}
          filter="url(#dropShadow)"
        />
      )}

      {/* Rewards Line */}
      {filteredChartData.length > 1 && (
        <Path
          d={lineRewards(filteredChartData)}
          fill="none"
          stroke="#FFC700"
          strokeWidth={2}
          filter="url(#dropShadow)"
        />
      )}

      {/* Invisible Circles for Touch Targets */}
      {filteredChartData.map((item, index) => {
        const dateFormatted = format(parseISO(item.timeInterval), 'dd/MM');
        return (
          <React.Fragment key={index}>
            <Circle
              cx={xScale(dateFormatted)}
              cy={yScaleHashrate(parseFloat(item.totalHashRate))}
              r={8}
              fill="transparent"
            />
            <Circle
              cx={xScale(dateFormatted)}
              cy={yScaleRewards(parseFloat(item.totalReward))}
              r={8}
              fill="transparent"
            />
          </React.Fragment>
        );
      })}

      {/* Tooltip */}
      {tooltipVisible && tooltipData && (
        <Tooltip
          tooltipWidth={tooltipWidth}
          tooltipHeight={tooltipHeight}
          tooltipRadius={tooltipRadius}
          tooltipPosition={tooltipPosition}
          tooltipData={tooltipData}
        />
      )}
    </Svg>
  );
};
import React from 'react';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { stylesHistory } from '@/app/css/styles/StylesHistory';
import { View } from 'react-native';

interface TooltipProps {
  tooltipWidth: number;
  tooltipHeight: number;
  tooltipRadius: number;
  tooltipPosition: { x: number; y: number };
  tooltipData: { hashrate: number | string; rewards: number | string; date: string } | null;
}

export const Tooltip: React.FC<TooltipProps> = ({
  tooltipWidth,
  tooltipHeight,
  tooltipRadius,
  tooltipPosition,
  tooltipData,
}) => (
  <View
    style={[
      stylesHistory.tooltipContainer,
      {
        transform: [
          { translateX: tooltipPosition.x - tooltipWidth / 2 },
          { translateY: tooltipPosition.y - tooltipHeight - 15 },
        ],
      },
    ]}
  >
    <Svg>
      <Rect
        x={0}
        y={0}
        width={tooltipWidth}
        height={tooltipHeight}
        fill="#2C2C3C"
        rx={tooltipRadius}
        ry={tooltipRadius}
      />
      <SvgText x={10} y={18} fontSize={12} fill="#BDBDBD">
        Hashrate: {tooltipData?.hashrate}
      </SvgText>
      <SvgText x={10} y={34} fontSize={12} fill="#BDBDBD">
        Rewards: {tooltipData?.rewards}
      </SvgText>
      <SvgText x={10} y={50} fontSize={12} fill="#BDBDBD">
        Date: {tooltipData?.date}
      </SvgText>
    </Svg>
  </View>
);
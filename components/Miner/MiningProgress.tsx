import { stylesMiner } from '@/app/css/styles/StylesMiner';
import React from 'react';
import { View, Text } from 'react-native';

const MiningProgress = ({ miningPower } : any) => (
  <View style={stylesMiner.progressBarContainer}>
    <View style={stylesMiner.progressBarWrapper}>
        <View style={[stylesMiner.progressBarFill, { width: `${miningPower}%` }]} />
    </View>
    {/*<Text style={stylesMiner.progressPercentage}>{Math.round(miningPower)}%</Text>*/}
  </View>
);

export default MiningProgress;
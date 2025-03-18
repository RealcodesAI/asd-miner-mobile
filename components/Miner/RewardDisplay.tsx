import { stylesMiner } from '@/app/css/styles/StylesMiner';
import React from 'react';
import {Text, TextStyle} from 'react-native';

const RewardDisplay = ({ showReward } : any) => (
  showReward ? (
    <Text style={stylesMiner.rewardText as TextStyle}>
      Block mined reward: 0.123 ASD
    </Text>
  ) : null
);

export default RewardDisplay;
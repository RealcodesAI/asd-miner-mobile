import React from 'react';
import {Text, TextStyle} from 'react-native';
import { stylesMiner } from '@/app/(tabs)/styles/StylesMiner';

const RewardDisplay = ({ showReward }) => (
  showReward ? (
    <Text style={stylesMiner.rewardText as TextStyle}>
      Block mined reward: 0.123 ASD
    </Text>
  ) : null
);

export default RewardDisplay;
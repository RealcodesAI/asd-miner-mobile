import React from 'react';
import {View, Text, TextStyle} from 'react-native';
import { stylesMiner } from '@/app/(tabs)/styles/StylesMiner';

const MiningLog = ({ miningLog }) => (
  miningLog ? (
    <View style={stylesMiner.miningLogContainer}>
      <Text style={stylesMiner.miningLog as TextStyle}>{miningLog}</Text>
    </View>
  ) : null
);

export default MiningLog;
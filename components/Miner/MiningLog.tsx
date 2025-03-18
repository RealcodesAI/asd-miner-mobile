import { stylesMiner } from '@/app/css/styles/StylesMiner';
import React from 'react';
import {View, Text, TextStyle} from 'react-native';

const MiningLog = ({ miningLog } : any) => (
  miningLog ? (
    <View style={stylesMiner.miningLogContainer}>
      <Text style={stylesMiner.miningLog as TextStyle}>{miningLog}</Text>
    </View>
  ) : null
);

export default MiningLog;
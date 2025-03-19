import { stylesMiner } from '@/app/css/styles/StylesMiner';
import React from 'react';
import {View, Text, TextStyle} from 'react-native';

const MiningLog = ({ miningLog } : any) => (
    <View style={stylesMiner.miningLogContainer}>
      <Text style={stylesMiner.miningLog as TextStyle}>{miningLog}</Text>
    </View>
);

export default MiningLog;
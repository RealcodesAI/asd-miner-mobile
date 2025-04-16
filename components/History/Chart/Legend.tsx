import React from 'react';
import { View, Text } from 'react-native';
import { stylesHistory } from '@/app/css/styles/StylesHistory';

export const Legend: React.FC = () => (
  <View style={stylesHistory.legend}>
    <View style={stylesHistory.legendItem}>
      <View style={[stylesHistory.legendColor, { backgroundColor: '#646AFF' }]} />
      <Text style={stylesHistory.legendText}>Hashrate</Text>
    </View>
    <View style={stylesHistory.legendItem}>
      <View style={[stylesHistory.legendColor, { backgroundColor: '#FFC700' }]} />
      <Text style={stylesHistory.legendText}>Rewards</Text>
    </View>
  </View>
);
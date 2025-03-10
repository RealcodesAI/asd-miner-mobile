import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { stylesMiner } from '@/app/(tabs)/styles/StylesMiner';

const MiningControls = ({ isMining, toggleMining }) => (
  <TouchableOpacity
    style={[stylesMiner.startButton, isMining && stylesMiner.stopButton]}
    onPress={toggleMining}
  >
    <Text style={stylesMiner.startButtonText}>
      {isMining ? "Stop mining" : "Start mining"}
    </Text>
  </TouchableOpacity>
);

export default MiningControls;
import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { stylesMiner } from '@/app/(tabs)/styles/StylesMiner';

const MiningLog = ({ miningLog }: { miningLog: string[] }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when miningLog changes
  useEffect(() => {
    if (scrollViewRef.current && miningLog.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [miningLog]);

  return (
    <View style={stylesMiner.miningLogOuterContainer}>
      <ScrollView
        ref={scrollViewRef}
        style={stylesMiner.miningLogScrollContainer}
        contentContainerStyle={stylesMiner.miningLogContentContainer}
        showsVerticalScrollIndicator={true}
      >
        {miningLog.map((log, index) => (
          <Text key={index} style={stylesMiner.miningLog}>
            {log}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default MiningLog;
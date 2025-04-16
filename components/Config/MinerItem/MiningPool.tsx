import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { stylesConfig } from "@/app/css/styles/StylesConfig";
import RNPickerSelect from 'react-native-picker-select';
import { getPoolStore } from "@/lib/zustand/getPool";
import { useMinerStore } from "@/lib/zustand/miner";

interface PoolItem {
  id: number | string;
  name: string;
  hashRate: number;
  totalTokenMined: number;
  type: string;
  difficulty: number;
  latestBlock: number;
  fee: string;
}
interface MiningPoolProps {
  initialPoolName?: string | undefined;
}

const MiningPool: React.FC<MiningPoolProps> = ({ initialPoolName })=> {
  const { pools, getPool } = getPoolStore();
  const { setSelectedPoolId } = useMinerStore();
  const [selectedPoolIdLocal, setSelectedPoolIdLocal] = useState<string | undefined>(undefined);
  const [dropdownItems, setDropdownItems] = useState<any[]>([]);
  const [selectedPoolName, setSelectedPoolName] = useState<string | null>(initialPoolName ||null);

  useEffect(() => {
    getPool();
  }, [getPool]);

  useEffect(() => {
    if (pools) {
      const items = (pools as PoolItem[]).map(pool => ({
        label: pool.name,
        value: pool.id,
      }));
      setDropdownItems(items);

      if (selectedPoolIdLocal) {
        const initialSelectedPool = (pools as PoolItem[])?.find(pool => pool.id === selectedPoolIdLocal);
        setSelectedPoolName(initialSelectedPool?.name || null);
      }
      else if (initialPoolName) {
        setSelectedPoolName(initialPoolName);
        const initialSelectedPool = (pools as PoolItem[])?.find(pool => pool.name === initialPoolName);
        setSelectedPoolIdLocal(initialSelectedPool?.id?.toString());
      }
    }
  }, [pools, selectedPoolIdLocal, initialPoolName]);

  const handlePoolSelect = (value: string | undefined) => {
    setSelectedPoolIdLocal(value);
    const selectedPool = (pools as PoolItem[])?.find(pool => pool.id === value);
    setSelectedPoolName(selectedPool?.name || null);
    setSelectedPoolId(value || '')
    if (selectedPool) {
      console.log('Selected Pool:', selectedPool.name, selectedPool.id);
    }
  };

  return (
    <View style={stylesConfig.card}>
      <View style={stylesConfig.containerImage}>
        <Image
          source={require("../../../assets/icon/wallet.png")}
          style={stylesConfig.image}
          resizeMode="contain"
        />
        <Text style={[stylesConfig.cardTitle, { lineHeight: 20 }]}>
          Mining Pool
        </Text>
      </View>

      <Text style={stylesConfig.warningText}>
        Select your preferred mining pool
      </Text>

      <Text style={stylesConfig.label}>Pool Name</Text>
      <View style={stylesConfig.dropdownContainer}>
        <RNPickerSelect
          placeholder={{
            label: selectedPoolName || 'Select a mining pool...',
            value: null,
            color: selectedPoolName ? 'black' : '#9EA0A4',
          }}
          items={dropdownItems}
          onValueChange={handlePoolSelect}
          value={selectedPoolIdLocal}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        />
      </View>
      <Text style={stylesConfig.hintText}>
        The default pool is recommended for optimal performance
      </Text>
    </View>
  );
};

export default MiningPool;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0,
    color: 'black',
    paddingRight: 30,
    borderColor: 'rgba(77, 77, 107, 1)'
  },
})
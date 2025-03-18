import {View, Text, ScrollView, RefreshControl} from 'react-native'
import React from 'react'
import Header from '@/components/Header/Header'
import InputWithdraw from '@/components/Withdraw/InputWithdraw'
import WithdrawHistory from '@/components/Withdraw/WithdrawHistory'
import {useRefresh} from "@/hooks/useRefresh";
import { stylesWithdraw } from '../css/styles/StylesWithdraw'

const Withdraw = () => {
  const { refreshing, refreshKey, onRefresh } = useRefresh();

  return (
    <ScrollView
      style={stylesWithdraw.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Header title="Withdraw" />
      <InputWithdraw key={`input-${refreshKey}`} />
      <WithdrawHistory key={`history-${refreshKey}`} />
    </ScrollView>
  )
}

export default Withdraw
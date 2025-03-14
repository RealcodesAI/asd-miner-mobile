import {View, Text, ScrollView, RefreshControl} from 'react-native'
import React from 'react'
import Header from '@/components/Header/Header'
import { stylesWithdraw } from './styles/StylesWithdraw'
import InputWithdraw from '@/components/Withdraw/InputWithdraw'
import WithdrawHistory from '@/components/Withdraw/WithdrawHistory'
import useRefresh from "@/hooks/useRefresh";

const Withdraw = () => {
  const { refreshing, onRefresh } = useRefresh(() => {
    console.log("Data refreshed!");
  });
  return (
    <ScrollView style={stylesWithdraw.container}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
    >
      <Header title="Withdraw"/>
      <InputWithdraw/>
      <WithdrawHistory/>
    </ScrollView>
  )
}

export default Withdraw
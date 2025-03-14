import {View, Text, ScrollView, RefreshControl} from 'react-native'
import React from 'react'
import Header from '@/components/Header/Header'
import { stylesWithdraw } from './styles/StylesWithdraw'
import InputWithdraw from '@/components/Withdraw/InputWithdraw'
import WithdrawHistory from '@/components/Withdraw/WithdrawHistory'

const Withdraw = () => {
  return (
    <ScrollView style={stylesWithdraw.container}>
      <Header title="Withdraw"/>
      <InputWithdraw/>
      <WithdrawHistory/>
    </ScrollView>
  )
}

export default Withdraw
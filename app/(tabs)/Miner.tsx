import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { stylesMiner } from './styles/StylesMiner'
import Header from '@/components/Header/Header'

const Miner = () => {
  return (
    <ScrollView style= {stylesMiner.container}>
      <Header title='Miner'/>
    </ScrollView>
  )
}

export default Miner
import { ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/Header/Header'
import { stylesConfig } from './styles/StylesConfig'
import MinerConfig from '@/components/Config/MinerConfig'

const Config = () => {
  return (
    <ScrollView style={stylesConfig.container}>
      <Header title='Config'/>
      <MinerConfig/>
    </ScrollView>
  )
}

export default Config
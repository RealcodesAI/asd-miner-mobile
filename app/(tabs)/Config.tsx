import { ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/Header/Header'
import MinerConfig from '@/components/Config/MinerConfig'
import { stylesConfig } from '../css/styles/StylesConfig'

const Config = () => {
  return (
    <ScrollView style={stylesConfig.container}>
      <Header title='Config'/>
      <MinerConfig/>
    </ScrollView>
  )
}

export default Config
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
    title: string,
    onPress: () => void,
}
const Button = ({title, onPress}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: 'rgba(254, 191, 50, 1)',
      paddingVertical: 14,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 20,
      width: "100%",
    },
     text: {
      fontWeight: '700',
      color: '#000',
      fontSize: 16,
      fontFamily:'Lexend',
      lineHeight: 22
     }
})

export default Button
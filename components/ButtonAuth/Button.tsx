import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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
        backgroundColor: '#FFD335',
        alignItems: "center",
        paddingVertical: 15,
        width: '100%',
        borderRadius: 12,
        height: 56,
        marginTop: 10
    },
     text: {
        color: '#1F1F1F',
        fontSize: 18,
        fontWeight: 700,
        fontFamily: 'Roboto'
     }
})

export default Button
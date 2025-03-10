import { stylesWithdraw } from "@/app/(tabs)/styles/StylesWithdraw";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const WithdrawScreen = () => {
  return (
    <View style={{marginHorizontal: 20}}>
      <Text style={stylesWithdraw.withdrawText}>Withdraw your reward</Text>
      
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={stylesWithdraw.withdrawLabel}>Current Reward</Text>
        <Text style={stylesWithdraw.withdrawValue}>100.123 ASD</Text>
      </View>

      <View style={stylesWithdraw.withdrawSection}>
        <Text style={stylesWithdraw.thresholdLabel}>Withdraw threshold</Text>

        <View style={stylesWithdraw.inputContainer}>
          <TextInput style={stylesWithdraw.input} placeholder="Enter amount" placeholderTextColor="#A0A0A0" />
          <TouchableOpacity style={stylesWithdraw.withdrawButton}>
            <Text style={stylesWithdraw.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <Text style={stylesWithdraw.infoText}>899.877 more to next withdraw</Text>
      </View>
    </View>
  );
};

export default WithdrawScreen;

import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const MinerConfig = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configure your miner</Text>
      <Text style={styles.note}>Note: you can only configure your miner once!</Text>

      {/* Wallet Address */}
      <Text style={styles.label}>Wallet Address</Text>
      <TextInput style={styles.input} />
      <Text style={styles.hintText}>Your reward wallet address. Accept EVM wallet address</Text>

      {/* Miner Name */}
      <Text style={styles.label}>Miner name</Text>
      <TextInput style={styles.input} />

      {/* Miner License */}
      <Text style={styles.label}>Miner license</Text>
      <TextInput style={styles.input} />
      <Text style={styles.hintText}>
        Do not have a license yet? <Text style={styles.linkText}>Get you one here.</Text>
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 5,
    fontFamily: "Roboto",
  },
  note: {
    color: "#AAA",
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 20,
  },
  label: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    marginTop:5
  },
  input: {
    backgroundColor: "#3D3C3C",
    color: "#FFF",
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  hintText: {
    color: "green",
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "400",
    fontFamily: 'Source Sans Pro'
  },
  linkText: {
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#FFD335",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Roboto",
  },
});

export default MinerConfig;

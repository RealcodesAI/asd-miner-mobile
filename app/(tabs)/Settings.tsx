import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/lib/zustand/auth'
import { List } from "react-native-paper";
const Settings = () => {
  const {fetchLogout} = useAuthStore()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}    
      <View style={styles.header}>
        <Text style={styles.headerText}>About app</Text>
        <View style={{ alignItems: "center"}}>
        <Image source={require('../../assets/images/avatar/image 173.png')} style={styles.avatar} />
        <Text style={styles.appTitle}>Dogecoin Miner</Text>
        </View>
      </View>

      <ScrollView style={styles.overlay}>

        <View style={styles.section}>
          <List.Item
            title="Version"
            description="1.0.0"
            titleStyle={styles.textWhite}
            descriptionStyle={styles.textWhite}
            left={(props) => <List.Icon {...props} color="white" icon="information-outline" />}
            right={(props) => <List.Icon {...props} color="white" icon="chevron-right" />}
          />
          <List.Item
            title="Rate the app 5 stars"
            titleStyle={styles.textWhite}
            left={(props) => <List.Icon {...props} color="white" icon="star-outline" />}
            right={(props) => <List.Icon {...props} color="white" icon="chevron-right" />}
          />
          <List.Item
            title="Terms and conditions"
            titleStyle={styles.textWhite}
            left={(props) => <List.Icon {...props} color="white" icon="shield-outline" />}
            right={(props) => <List.Icon {...props} color="white" icon="chevron-right" />}
          />
          <List.Item
            title="Contact Us"
            titleStyle={styles.textWhite}
            left={(props) => <List.Icon {...props} color="white" icon="email-outline" />}
            right={(props) => <List.Icon {...props} color="white" icon="chevron-right" />}
          />
        </View>

        {/* Studio Section */}
        <View style={styles.section}>
          <List.Item
            title="Your developer name"
            description="Android App Specialist"
            titleStyle={styles.textWhite}
            descriptionStyle={styles.textWhite}
            left={(props) => <List.Icon {...props} color="white" icon="briefcase-outline" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#FFD700",
    paddingTop: 25,
    paddingBottom: 60, 
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
    fontFamily: "Lato",
    marginHorizontal: 20
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 50,
    marginTop: 25
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Roboto",
    color: "#000",
    marginTop: 10,
    marginBottom: 10
  },
  overlay: {
    position: "absolute",
    top: "37%",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: "#222",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    elevation: 5, 
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  textWhite: {
    color: "white",
  },
});

export default Settings
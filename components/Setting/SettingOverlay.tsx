import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { stylesSetting } from '@/app/(tabs)/styles/StylesSetting'
import { ScrollView } from 'react-native';
import MenuItem from './MenuItem';

const SettingOverlay = () => {
    
  return (
    <ScrollView style={stylesSetting.overlay}>
        {/* Information Section */}
        <View style={stylesSetting.section}>
          <MenuItem
            title="Version"
            description="1.0.0"
            image={require("../../assets/icon/exclamation-circle.png")}
          />
          <MenuItem
            title="Rate the app 5 stars"
            image={require("../../assets/icon/star.png")}
          />
          <MenuItem
            title="Terms and conditions"
            image={require("../../assets/icon/shield-check.png")}
          />
          <MenuItem
            title="Contact Us"
            image={require("../../assets/icon/mail.png")}
          />
        </View>

        {/* Studio Section */}
        <View style={stylesSetting.section}>
          <Text style={stylesSetting.textSection}>Studio</Text>
          <View style={stylesSetting.menuItem}>
            <Image
              source={require("../../assets/icon/newspaper.png")}
              style={stylesSetting.icon}
            />
            <View style={stylesSetting.menuTextContainer}>
              <Text style={stylesSetting.menuTitle}>Your developer name</Text>
              <Text style={stylesSetting.menuDescription}>
                Android App Specialist
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
  )
}

export default SettingOverlay
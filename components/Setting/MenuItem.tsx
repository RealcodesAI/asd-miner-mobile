import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { stylesSetting } from '@/app/(tabs)/styles/StylesSetting';

interface MenuItemProps {
    title: string;
    description?: string;
    image: any
}

const MenuItem = ({ title, description,image }: MenuItemProps) => {
    return (
        <TouchableOpacity style={stylesSetting.menuItem} activeOpacity={0.7}>
          <Image source={image} style={stylesSetting.icon} />
          <View style={stylesSetting.menuTextContainer}>
            <Text style={stylesSetting.menuTitle}>{title}</Text>
            {description && <Text style={stylesSetting.menuDescription}>{description}</Text>}
          </View>
          <Image source={require('../../assets/icon/Group 48.png')}/>
        </TouchableOpacity>
      );
}

export default MenuItem
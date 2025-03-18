import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const tabStyles = StyleSheet.create({
    tabBar: {
        height: 70,
        backgroundColor: '#242328',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
        width: width ,
        margin: 'auto',
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
    },
    iconFocused: {
        width: 22,
        height: 22,
        tintColor: "#FFD335", 
      },
      iconUnfocused: {
        width: 22,
        height: 22,
        tintColor: "#F2F2F2",
      },

    label: { 
        fontSize: 12, 
        color: "#F2F2F2" ,
        fontWeight: 400,
        fontFamily: 'Roboto'
    },
    labelFocused: {
        fontSize: 12, 
        color: "#FFD335",
        fontWeight: 400,
        fontFamily: 'Roboto'
    },
})
import { StyleSheet } from "react-native";

export const stylesSetting = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
      },
      header: {
        backgroundColor: "#FFD700",
        paddingBottom: 50,
      },
      headerText: {
        fontSize: 18,
        fontFamily: "Lato",
        fontWeight: "500",
        color: "#000",
        // marginBottom: 10,
        marginTop: 20,
        marginHorizontal: 20
      },
      groupImage: {
        alignItems: "center",
        marginTop: 20
      },
      avatar: {
        width: 92,
        height: 92,
        borderRadius: 50,
        shadowColor: "#000",
      },
      appTitle: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Roboto",
        color: "#000",
        marginTop: 10,
      },
      overlay: {
        position: "absolute",
        left: 0,
        right: 0,
        top: '32%',
        paddingHorizontal: 20,
      },
      section: {
        backgroundColor: "#222",
        borderRadius: 20,
        paddingVertical: 3,
        marginBottom: 10,
        elevation: 5, 
        shadowColor: "#fff", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginTop:5
      },
      textSection: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "500",
        fontFamily: "Roboto",
        marginTop: 10,
        marginLeft:15
      },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomColor: "#333",
      },
      icon: {
        width: 25,
        height: 25,
        marginRight: 10,
      },
      menuTextContainer: {
        flex: 1,
      },
      menuTitle: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Roboto"
      },
      menuDescription: {
        color: "#8E8E8E",
        fontSize: 12,
        marginTop: 2,
      },
      chevron: {
        color: "white",
        fontSize: 18,
      },
})
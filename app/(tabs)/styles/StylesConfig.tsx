import { StyleSheet } from "react-native";

export const stylesConfig = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    containerConfig: {
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
      disabledInput: {
        backgroundColor: "#f0f0f0", // Màu nền xám nhẹ
        color: "#888", // Chữ màu xám
        borderColor: "#ddd", // Viền xám nhạt
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
      disabledButton: {
        backgroundColor: "#FFE680",
        opacity: 0.75,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        fontFamily: "Roboto",
      },
})
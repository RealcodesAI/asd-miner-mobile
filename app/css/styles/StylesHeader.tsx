import { StyleSheet } from "react-native";

export const stylesHeader = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 21,
    marginRight: 12,
  },
  textContainer: {
    flexDirection: "column",
  },
  greeting: {
    color: "white",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    fontFamily: "Lexend",
  },
  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    fontFamily: "Lexend",
  },
  bellButton: {
    padding: 8,
    height: 45,
    width: 45,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'Lexend',
    fontWeight: 700, 
    lineHeight: 24,
    color: 'white',
    paddingHorizontal: 25,
    marginTop: 10,
  }
});

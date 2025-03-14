import { StyleSheet } from "react-native";

export const stylesHeader = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
    marginTop: 10,
  },
  imageGroup: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Lato",
  },
  icon: {
    width: 24,
    height: 24,
  }
});

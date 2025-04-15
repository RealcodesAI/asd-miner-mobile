import { StyleSheet } from "react-native";

export const tabStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(19, 3, 56, 1)",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    // overflow: "hidden",
  },
  tabBar: {
    height: 100,
    borderTopWidth: 1,
    borderColor: "rgba(19, 3, 56, 1)",
    backgroundColor: "rgba(19, 3, 56, 1)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    // overflow: "hidden",
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  iconFocused: {
    width: 24,
    height: 24,
    tintColor: "#FFD335",
  },
  iconUnfocused: {
    width: 24,
    height: 24,
    tintColor: "#F2F2F2",
  },

  label: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: 500,
    fontFamily: "Lexend",
    lineHeight: 14,
  },
  labelFocused: {
    fontSize: 10,
    color: "rgba(254, 191, 50, 1)",
    fontWeight: "500",
    fontFamily: "Lexend",
    lineHeight: 14,
    shadowColor: "rgba(254, 191, 50, 1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
});

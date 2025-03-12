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
  },
  avatarContainer: {
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 100,
    overflow: "hidden",
  },

  // Overlay nền mờ
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    zIndex: 999, // Đảm bảo popup hiển thị phía trên
  },

  // Popup container
  popupContainer: {
    width: "80%",
    backgroundColor: "#1A1A2E",
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    position: "absolute",
    marginTop: 60,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    padding: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#444",
    width: "100%",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});

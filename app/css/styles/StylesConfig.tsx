import { StyleSheet } from "react-native";

export const stylesConfig = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 30,
  },
  card: {
    borderRadius: 8,
    borderColor: "#322646",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  containerImage: {
    flexDirection: "row", alignItems: "center" ,
    flexWrap: "wrap",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
    paddingBottom: 5,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Lexend",
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 22,
  },
  warningText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 25,
    fontFamily: "Lexend",
    fontWeight: 400,
    lineHeight: 16,
  },
  Button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(58, 58, 83, 1)",
    borderRadius: 16,
    paddingVertical: 10,
    marginTop: 15,
  },
  ButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: 400,
    fontSize: 16,
    fontFamily: "Lexend",
    lineHeight: 22,
  },

  label: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    color: "#FFF",
    borderRadius: 6,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(77, 77, 107, 1)",
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Lexend",
    lineHeight: 20,
  },
  hintText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    marginBottom: 5,
    fontWeight: "400",
    fontFamily: "Lexend",
    lineHeight: 14,
  },
  button: {
    backgroundColor: "#FEBF32",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
    marginLeft: 6,
    fontSize: 16,
    fontFamily: "Lexend",
    lineHeight: 22,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    maxHeight: "60%", // Giới hạn chiều cao để tránh tràn màn hình
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Hiệu ứng nổi trên Android
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#333",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Mờ nền
  },

  // Nội dung modal
  modalContents: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Text hiển thị trong modal
  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

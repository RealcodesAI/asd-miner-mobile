import { StyleSheet } from "react-native";

export const stylesAuth = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
    textAlign: "center",
    marginTop: 15,
  },

  form: {
    marginTop: 25,
    width: "100%",
    gap: 10
  },
  textInput: {
    color: "#AEA8B2",
    fontWeight: "400",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3D3C3C",
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    borderWidth: 0
  },
  icon: {
    marginLeft: 10,
  },
  registerText: {
    marginTop: 15,
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền tối mờ
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
  },
  inputModal: {
    backgroundColor: "#3D3C3C",
    height: 46,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 10
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "Roboto",
    color: "white",
    textAlign: "center",
    marginTop: 20
  },
  
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
});
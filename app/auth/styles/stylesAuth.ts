import { StyleSheet } from "react-native";

export const stylesAuth = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  title: {
    marginTop: 30,
    color: 'white',
    fontSize: 18,
    fontFamily: "Lexend",
    fontWeight: '700',
    marginBottom: 5,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 12,
    fontFamily: "Lexend",
    textAlign: 'center',
    fontWeight: 400,
    marginBottom: 20,
    lineHeight: 18,
    paddingHorizontal: 15
  },

  containerTitle: {
    paddingHorizontal: 13
  },

  form: {
    width: "100%",
    gap: 8
  },
  textInput: {
    color: "#AEA8B2",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Lexend",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3D3C3C",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'Lexend'
  },
  icon: {
    marginLeft: 10,
  },
  registerText: {
    fontSize: 14,
    color: "rgba(254, 191, 50, 1)",
    fontWeight: 400,
    fontFamily: 'Lexend',
    lineHeight: 20
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
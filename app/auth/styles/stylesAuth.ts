import { StyleSheet } from "react-native";

export const stylesAuth = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingHorizontal: 25,
    justifyContent: 'center'
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
    textAlign: "center",
    marginTop: 20,
  },

  form: {
    marginTop: 30,
    width: "100%",
    gap: 16,
  },
  textInput: {
    color: "#AEA8B2",
    fontWeight: "400",
    marginBottom: 8,
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
});
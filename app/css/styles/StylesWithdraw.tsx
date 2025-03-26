import {Dimensions, StyleSheet} from "react-native";

const {width} = Dimensions.get("window");

export const stylesWithdraw = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  withdrawText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
    marginBottom: 15,
  },
  withdrawLabel: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Roboto",
    marginBottom: 5,
  },
  withdrawValue: {
    color: "#FFD335",
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  withdrawSection: {
    marginTop: 20,
  },
  thresholdLabel: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Source Sans Pro",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    height: 45,
    backgroundColor: "#3D3C3C",
    color: "#FFF",
    borderRadius: 8,
    width: width * 0.5,
    paddingHorizontal: 10,
  },
  withdrawButton: {
    backgroundColor: "#FFD335",
    height: 45,
    borderRadius: 8,
    width: width * 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    fontFamily: "Roboto",
  },
  infoText: {
    color: "#D5D5D5",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Roboto",
    marginTop: 10,
  },
// Withdraw history
  historyTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 15,
    fontFamily: "Roboto",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  // Add these styles to your stylesWithdraw.js file
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshButton: {
    paddingHorizontal: 20,
  },
  historyItem: {
    flexDirection: "row",
    height: 90,
    backgroundColor: "#1A1A1A",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    marginHorizontal: 20,
    borderWidth: 1
  },
  avatarContainer: {
    width: 48,
    height: 70,
    borderRadius: 14,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {width: '100%', height: "100%", borderRadius: 8},
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "Roboto"
  },
  detail:  {
    color: "#8B8B8B",
    fontSize: 10.5,
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  time: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 400
  },

  icon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 10,
  },
})
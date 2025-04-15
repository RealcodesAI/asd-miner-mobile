import { StyleSheet } from "react-native";

export const stylesHistory = StyleSheet.create({
  container: { flex: 1},
  card: {
    backgroundColor: "#150E28",
    borderRadius: 8,
    marginBottom: 30,
    borderColor: "rgba(77, 77, 107, 1)",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  sectionLabel: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: 'Lexend',
    lineHeight: 22
  },
  balanceAmount: {
    color: "rgba(254, 191, 50, 1)",
    fontSize: 28,
    fontWeight: "700",
    fontFamily:'Lexend',
    lineHeight: 36,
    marginBottom: 15,
  },
  subLabel: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Lexend',
    lineHeight: 16,
    fontWeight: 500
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#30204A",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FEBF32",
  },
  progressText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
    fontFamily: 'Lexend',
    lineHeight: 16,
    fontWeight: 400,
    marginBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 30,
    marginVertical: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: "#fff",
  },
  tabButtonText: {
    color: "#aaa",
    fontWeight: 700,
    fontSize: 12,
    fontFamily: 'Lexend',
    lineHeight: 16  
  },
  tabButtonTextActive: {
    color: "#000",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    marginTop: 10
  },
  historyAmount: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "700",
    fontSize: 14,
    fontFamily: 'Lexend',
    lineHeight: 20,
    marginBottom: 5,
  },
  historyDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: 'Lexend',
    lineHeight: 16,
    fontWeight: 400,
    marginBottom: 10,
  },
  completedBadge: {
    backgroundColor: "#22C55E",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  completedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: 'Lexend',
    lineHeight: 16,
  },



  minerHistory: { marginTop: 0 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  refreshButton: {
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#FFF",
    marginBottom: "auto",
  },
  minerTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 600,
    paddingHorizontal: 20,
    fontFamily: "Roboto",
  },
  rewardBox: {
    backgroundColor: "#FFD335",
    padding: 10,
    width: "100%",
    height: 65,
    marginTop: 15,
  },
  rewardText: {
    fontWeight: 400,
    color: "#1A1A1A",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  nextReward: {
    color: "#1A1A1A",
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "Roboto",
    marginBottom: 5,
  },
  chartLabel: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    fontWeight: 400,
    fontFamily: "Roboto",
  },
  chartValue: {
    color: "#FFD335",
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Roboto",
    textAlign: "center",
    marginTop: 5,
  },
  chart: {
    // borderRadius: 10,
    backgroundColor: 'transparent',
    marginTop: 10,
  },

  historyTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 15,
    fontFamily: "Roboto",
    paddingHorizontal: 20,
  },
  // historyItem: {
  //   flexDirection: "row",
  //   height: 103,
  //   backgroundColor: "#1A1A1A",
  //   padding: 10,
  //   marginBottom: 15,
  //   marginHorizontal: 20,
  //   borderRadius: 10,
  // },
  avatarContainer: {
    width: 48,
    height: "auto",
    borderRadius: 14,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: "100%", height: "100%", borderRadius: 8 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  detail: {
    color: "#8B8B8B",
    fontSize: 10.5,
    fontFamily: "Roboto",
    fontWeight: 400,
    marginTop: 3,
  },

  time: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Roboto",
    fontWeight: 400,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  paginationButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFD335",
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#FFD335",
  },
  paginationButtonText: {
    color: "black",
    fontWeight: "500",
  },
  pageIndicator: {
    fontSize: 14,
    fontWeight: "500",
  },

  icon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 10,
  },
  containerTooltip: {
    position: "absolute",
    backgroundColor: "#FFF",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textTooltip: {
    color: "#000",
    fontWeight: "500",
    fontSize: 12,
    fontFamily: "Roboto"
  },
});

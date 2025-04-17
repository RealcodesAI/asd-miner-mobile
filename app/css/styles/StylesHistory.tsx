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
    paddingVertical: 20,
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

  legendContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: '#ccc',
    fontSize: 12,
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(31, 31, 48, 1)',
    padding: 5,
    borderRadius: 5,
  },
  tooltipLabel: {
    color: '#fff',
    fontSize: 12,
  },
  chart: {
    // marginVertical: 10,
    marginTop: 20,
    borderRadius: 8,
  },
});

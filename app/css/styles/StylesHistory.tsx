import { StyleSheet } from "react-native";

export const stylesHistory = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  minerHistory: { marginTop: 0 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshButton: {
    paddingHorizontal: 20,
    fontSize: 20,
    color: "#FFF",
    marginBottom:'auto'
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
    marginTop:15
  },
  rewardText: { fontWeight: 400, color: "#1A1A1A", fontSize: 14,fontFamily: "Roboto" },
  nextReward: { color: "#1A1A1A", fontSize: 18, fontWeight: 400,fontFamily: "Roboto", marginBottom: 5 },
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
  chart: { marginTop: 10, width: '100%' },

  historyTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 15,
    fontFamily: "Roboto",
    paddingHorizontal: 20,
  },
  historyItem: {
    flexDirection: "row",
    height: 103,
    backgroundColor: "#1A1A1A",
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    borderRadius: 10
  },
  avatarContainer: {
    width: 48,
    height: 'auto',
    borderRadius: 14,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: { width: '100%', height: '100%', borderRadius: 8},
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: { 
    color: "#FFF", 
    fontSize: 13, 
    fontWeight:600, 
    fontFamily: "Roboto" 
  },
  detail: { 
    color: "#8B8B8B", 
    fontSize: 10.5, 
    fontFamily: "Roboto", 
    fontWeight: 400 ,
    marginTop: 3 
  },
    
  time: {
     color: "#FFF", 
     fontSize: 13, 
     fontFamily: "Roboto", 
     fontWeight: 400 
    },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,

  },
  paginationButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFD335',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#FFD335',
  },
  paginationButtonText: {
    color: 'black',
    fontWeight: '500',
  },
  pageIndicator: {
    fontSize: 14,
    fontWeight: '500',
  }
});
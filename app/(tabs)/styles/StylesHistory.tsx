import { StyleSheet } from "react-native";

export const stylesHistory = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
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
    alignItems: "center"
  },
  title: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 600,
    // padding: 25,
    fontFamily: "Roboto",
  },
  icon: { width: 24, height: 24 },
  minerHistory: { marginTop: 0 },
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
  chart: { marginTop: 10, width: '100%' , paddingHorizontal: 15 },

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
    borderRadius: 8,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: { width: 24, height: 24 , borderRadius: 20},
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
});
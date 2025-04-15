import {Platform, StyleSheet} from "react-native";

export const stylesMiner = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statBox: {
    width: '48%',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  containerImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  image: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '400',
    fontFamily: 'Lexend',
    lineHeight: 16,
  },
  statValue: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Lexend',
    lineHeight: 22,
  },

  startButton: {
    backgroundColor: 'rgba(66, 170, 16, 1)',
    borderRadius: 16,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    marginTop: 15
  },
  stopButton: {
    backgroundColor: 'rgba(236, 34, 31, 1)',
  },
  startButtonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Lexend',
    lineHeight: 24,
  },
  Container: {
    marginTop: 5
  },
  text: {
    fontFamily: 'Lexend',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 20,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'relative',
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(77, 77, 107, 1)',
  },
  miningLogContainer: {
    width: '100%',
    minHeight: 200,
  },
  miningLog: {
    color: 'rgba(255, 255, 255, 1)', 
    fontFamily:'Lexend',
    fontWeight: '400',
    lineHeight: 20,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    paddingBottom: 10,
  },
});
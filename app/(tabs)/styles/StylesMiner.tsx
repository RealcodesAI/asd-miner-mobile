import {Platform, StyleSheet} from "react-native";

export const stylesMiner = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  balance: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    marginVertical: 20,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 40,
    alignSelf: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  Container: {
    paddingHorizontal: 20,
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#242328',
    paddingVertical: 20,
    paddingHorizontal: 30,
    position: 'relative',
    borderRadius: 14,
    justifyContent: 'center',
  },
  hashRate: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  rewardText: {
    color: 'white',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#1F1F22',
    borderRadius: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  progressBarWrapper: {
    flex: 1,
    height: 30,
    backgroundColor: '#333',
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  progressPercentage: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'right',
  },
  stopButton: {
    backgroundColor: '#FF4500',
  },
  miningLogContainer: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#1A1A1D',
    padding: 10,
    borderRadius: 5,
    minHeight: 80,
  },
  miningLog: {
    color: '#4CAF50', // Màu xanh lá như trong terminal
    fontFamily:'monospace',
    fontSize: 14,
  },
  progressBarFillBase: {
    height: '100%',
    backgroundColor: '#FFD700',
  },


});
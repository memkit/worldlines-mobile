import React from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AssembleStart } from './AssembleStart';
import { Assembling } from './Assembling';
import { Minting } from './Minting';

export type NavigatorParamList = {
  start: undefined,
  assembling: undefined,
  mint: undefined,
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

export const Assemble = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='start' component={AssembleStart} />
      <Stack.Screen name='assembling' component={Assembling} />
      <Stack.Screen name='mint' component={Minting} />
    </Stack.Navigator>
  )
}

export const styles = StyleSheet.create({
  artifactLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  artifactDetailsContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 3,
    color: 'rgb(54, 123, 246)',
  },
  nftRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nftTimeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    width: 65
  },
  nftGradient: {
    padding: 8,
    borderRadius: 15,
    margin: 32,
    marginTop: -20,
  },
  nftContainer: {
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    padding: 10,
  },
  nftTimestampLabel: {
    fontSize: 14,
    color: 'darkgray',
    padding: 5,
  },
  nftTimeLine: {
    borderLeftColor: 'black',
    height: 20,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  nftTimeDot: {
    height: 2,
    width: 2,
    margin: 3,
    backgroundColor: 'black',
  },
  durationLabel: {
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 75,
    paddingRight: 75,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  sliderLabel: {
    fontSize: 16,
    color: 'darkgray',
    padding: 10,
  },
  assemblyTitleContainerNegative: {
    marginTop: -100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    marginLeft: 30,
  },
  assemblyTitleContainer: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    marginLeft: 30,
  },
  assemblyTitle: {
    textAlign: 'center',
    fontSize: 30,
    paddingRight: 10,
    fontWeight: '500',
    lineHeight: 40,
    paddingTop: 0,
  },
  mintTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveButtonText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16
  },
  leaveButton: {
    margin: 30,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
  optionContainer: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: 'red',
    borderWidth: 2,
    borderRadius: 35,
    // height: 70,
    padding: 20,

  },
  listContainer: {
    padding: 10,
  },
  assembleTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    padding: 40,
    lineHeight: 40,
    paddingBottom: 30,
    paddingTop: 0,
  },
  assembleSubtitle: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    paddingBottom: 50,
  },
  assembleContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignContent: 'center',
    paddingTop: 150,
  },
})

export const nodesStyles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
  },
  container: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    margin: 20,
    background: 'dark-gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerSelected: {
    borderColor: 'magenta',
    borderWidth: 3,
    borderRadius: 8,
    padding: 15,
    margin: 20,
    background: 'dark-gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stack: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    // color: 'white',
  },
  id: {
    fontSize: 10,
    color: 'gray',
  },
  rssi: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.7)',
  },
})
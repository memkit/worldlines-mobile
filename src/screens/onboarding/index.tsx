import React, { useRef } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Icons } from '../../assets/icons';
import useTheme from '../../hooks/useTheme';
import { MainStackNavigator } from '../../navigation/MainStackNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Tutorial } from './Tutorial';
import { ConnectWallet } from './ConnectWallet';

export type NavigatorParamList = {
  tutorial: undefined,
  connectWallet: undefined,
}

const Stack = createNativeStackNavigator<NavigatorParamList>()


export const Onboarding = () => {

  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name='tutorial' component={Tutorial} />
      <Stack.Screen name='connectWallet' component={ConnectWallet} />
    </Stack.Navigator>
  );

}


const styles = StyleSheet.create({
  slide: {

  },
  title: {

  },
  assembleSubtitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    padding: 40,
    lineHeight: 40,
    
  },
  assembleContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignContent: 'center',
    paddingTop: 150,
  },
  assembleTitle: {
    padding: 50,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
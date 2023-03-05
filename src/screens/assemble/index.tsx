import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';

export const Assemble = () => {
  const startAssembly = () => {
    
  }

  return (
    <View style={styles.assembleContainer}>
      <Text style={styles.assembleSubtitle}>Start assembling to create content with your friends!</Text>
      <PrimaryButton onPress={startAssembly}>Assemble</PrimaryButton>
    </View>
  )
}

const styles = StyleSheet.create({
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
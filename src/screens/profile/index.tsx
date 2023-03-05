import React from 'react';
import { Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';

export const Profile = () => {
  const reset = () => {

  }
  return (
    <View>
      <Text>Profile</Text>
      <PrimaryButton onPress={reset}>Reset Onboarding</PrimaryButton>
    </View>
  )
}
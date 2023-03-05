import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { navigate } from '../../navigation';
import Slider from '@react-native-community/slider';
import { Icons } from '../../assets/icons';
import { styles } from './index';
import { NftView } from '../../components/NftView';


export const Minting = () => {
  const [duration, setDuration] = useState(100);

  const doMint = () => {
    navigate('home', { screen: 'Lines' });
  };

  const handleValueChange = (value: number) => {
    setDuration(value);
  };

  const displayedNumber = duration < 3 ? Math.round(duration * 24) : duration < 14 ? Math.round(duration) : duration < 60 ? Math.round(duration / 7) : duration < 365 ? Math.round(duration / 30) : Math.round(duration / 365);
  const displayedPeriod = duration < 3 ? 'hours' : duration < 14 ? 'days' : duration < 60 ? 'weeks' : duration < 365 ? 'months' : duration < (365 * 1.5) ? 'year' : 'years';
  return (
    <View style={styles.assembleContainer}>
      <NftView name='clever-octopus' allowEdit />
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>24 hours</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={1}
          maximumValue={1095}
          value={100}
          onValueChange={handleValueChange}
          minimumTrackTintColor='cyan'
          maximumTrackTintColor='lightgray' />
        <Text style={styles.sliderLabel}>3 years</Text>
      </View>
      <Text style={styles.durationLabel}>Your Mem will be stored for {displayedNumber} {displayedPeriod}.</Text>
      <PrimaryButton onPress={doMint}>Mint for {(duration * 0.00179817352).toFixed(3)} MEMS</PrimaryButton>
    </View>
  );
};

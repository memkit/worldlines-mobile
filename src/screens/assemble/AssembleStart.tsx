import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import useTheme from '../../hooks/useTheme';
import { navigate } from '../../navigation';
import { styles, nodesStyles } from './index';

type ItemProps = {
  id: string
  name: string
  distance: number,
  selected: boolean
}

export const AssembleStart = () => {
  const { AppTheme } = useTheme();

  const [assembling, setAssembling] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [data, setData] = useState([{
    id: '0x3acf....8a67',
    name: 'mconstant.eth',
    distance: 2,
    selected: false,
  }]);

  const startAssembly = () => {
    setAssembling(true);
    setTimeout(() => {
      console.log('setting data');
      setData([
        {
          id: '0x3acf9e8a67',
          name: 'mconstant.eth',
          distance: 3,
          selected: false,
        }
      ]);
    }, 3000);
  };

  const handleItemSelected = (item: ItemProps) => {
    setData([
      {
        id: '0x3acf9e8a67',
        name: 'mconstant.eth',
        distance: 3,
        selected: true,
      }
    ]);
    setShowStart(true);
  };

  const handleStart = () => {
    navigate('assembling');
  };

  return (
    <>
      {assembling ?
        <View style={styles.assembleContainer}>
          <Text style={styles.assembleTitle}>Searching for assemblers near you!</Text>
          <Text style={styles.assembleSubtitle}>Select assemblers to start a shared TimeLine session.</Text>
          {data.map(item => (
            <TouchableOpacity onPress={() => handleItemSelected(item)}>
              <View style={item.selected ? nodesStyles.containerSelected : nodesStyles.container}>
                <View style={nodesStyles.stack}>
                  <Text style={nodesStyles.name}>{item.name}</Text>
                </View>
                <Text style={nodesStyles.rssi}>{item.distance} meters</Text>
              </View>
            </TouchableOpacity>
          ))}
          <ActivityIndicator color={AppTheme.color.palette.blue} size='large' />
          <View style={{ height: 40 }} />
          {showStart && <PrimaryButton onPress={handleStart}>Start</PrimaryButton>}
        </View>
        :
        <View style={styles.assembleContainer}>
          <Text style={styles.assembleTitle}>Start assembling to create mems with your friends!</Text>
          <PrimaryButton onPress={startAssembly}>Assemble</PrimaryButton>
        </View>}
    </>
  );
};

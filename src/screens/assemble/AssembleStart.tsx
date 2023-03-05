import React, { useState } from 'react';
import { ActivityIndicator, EmitterSubscription, NativeEventEmitter, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import useTheme from '../../hooks/useTheme';
import { navigate } from '../../navigation';
import { styles, nodesStyles } from './index';
import C3POReactNativeBle from "@secretarium/react-native-ble";
import uuid from 'react-native-uuid';

const eventEmitter = new NativeEventEmitter(C3POReactNativeBle);
var subscription: EmitterSubscription;
type ItemProps = {
  id: string
  name: string
  distance: number,
  selected: boolean
}

type BluetoothEvent = {
  name: string,
  identifier: string,
  services: Array<string>,
  txPower: number,
  rssi: number,
}

export const AssembleStart = () => {
  const { AppTheme } = useTheme();

  const [assembling, setAssembling] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [showData, setShowData] = useState(false);

  const deviceDiscovered = (event: BluetoothEvent) => {
    // do nothing, for now *wink*
  }

  const startAssembly = async () => {
    setAssembling(true);
    await C3POReactNativeBle.setManufacturerId(0xFFFF);
    await C3POReactNativeBle.broadcast(uuid.v4(), [123]);
    subscription = eventEmitter.addListener('onDeviceFound', deviceDiscovered);
    await C3POReactNativeBle.scan();
    setShowData(true);
  };
  const [selected, setSelected] = useState(false);
  const handleItemSelected = () => {
    setSelected(true);
    setShowStart(true);
  };

  const handleStart = () => {
    // cancel the subscription if we start a session
    if (subscription) {
      subscription.remove();
    }
    navigate('assembling');
  };

  return (
    <>
      {assembling ?
        <View style={styles.assembleContainer}>
          <Text style={styles.assembleTitle}>Searching for assemblers near you!</Text>
          <Text style={styles.assembleSubtitle}>Select assemblers to start a shared TimeLine session.</Text>
            {showData && <TouchableOpacity onPress={() => handleItemSelected()}>
              <View style={selected ? nodesStyles.containerSelected : nodesStyles.container}>
                <View style={nodesStyles.stack}>
                  <Text style={nodesStyles.name}>mconstant.eth</Text>
                </View>
                <Text style={nodesStyles.rssi}>3 meters</Text>
              </View>
            </TouchableOpacity>}
          <ActivityIndicator color={AppTheme.color.palette.blue} size='large' />
          <View style={{ height: 40 }} />
          {showStart && <PrimaryButton onPress={handleStart}>Start</PrimaryButton>}
        </View>
        :
        <View style={styles.assembleContainer}>
          <Text style={styles.assembleTitle}>Start assembling to create Mems with nearby friends!</Text>
          <PrimaryButton onPress={startAssembly}>Assemble</PrimaryButton>
        </View>}
    </>
  );
};

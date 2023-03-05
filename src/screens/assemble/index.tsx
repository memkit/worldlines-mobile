import React, { useState } from 'react';
import { Button, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AssembleStart } from './AssembleStart';
import { Assembling } from './Assembling';
import { navigate } from '../../navigation';
import Slider from '@react-native-community/slider';
import { Icons } from '../../assets/icons';
import LinearGradient from "react-native-linear-gradient";
import { MenuView } from '@react-native-menu/menu';

export type NavigatorParamList = {
  start: undefined,
  assembling: undefined,
  mint: undefined,
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

const Minting = () => {
  const [nft] = useState({
    contents: [
      {
        type: 'note',
        title: 'Agenda',
        size: '2Kb',
        time: '4:02AM',
        icon: <Icons.note color={'#F3B421'} size={30} />,
      },
      {
        type: 'photo',
        title: 'Whiteboard Drawing',
        size: '4Mb',
        time: '4:05AM',
        icon: <Icons.camera color={'magenta'} size={30} />,
      },
      {
        type: 'audio',
        title: 'My Commentary',
        size: '35Kb',
        time: '4:11AM',
        icon: <Icons.audio color={'red'} size={30} />,
      },
    ],
  })

  const [duration, setDuration] = useState(100);

  const doMint = () => {
    navigate('home', {screen: 'Lines'});
  }

  const handleValueChange = (value: number) => {
    setDuration(value)
  }

  const displayedNumber = duration < 3 ? Math.round(duration * 24) : duration < 14 ? Math.round(duration) : duration < 60 ? Math.round(duration / 7) : duration < 365 ? Math.round(duration / 30) : Math.round(duration / 365);
  const displayedPeriod = duration < 3 ? 'hours' : duration < 14 ? 'days' : duration < 60 ? 'weeks' : duration < 365 ? 'months' : duration < (365*1.5) ? 'year' : 'years';
  return (
      <View style={styles.assembleContainer}>
        <View style={styles.assemblyTitleContainer}>
          <Text style={styles.assemblyTitle}>clever-octopus</Text>
          <TouchableOpacity>
            <Icons.edit color='darkgray' size={30} />
          </TouchableOpacity>
        </View>
        <LinearGradient
          colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
          style={styles.nftGradient}
        >

        <View style={styles.nftContainer}>
          {nft.contents.map(item => (
            <View style={styles.nftRowContainer}>
              <View style={styles.nftTimeContainer}>
                <View style={styles.nftTimeLine} />
                <View style={styles.nftTimeDot} />
                <Text style={styles.nftTimestampLabel}>{item.time}</Text>
                <View style={styles.nftTimeDot} />
                <View style={styles.nftTimeLine} />
              </View>
              {item.icon}
              <MenuView
                onPressAction={({ nativeEvent }) => {
                  console.warn(JSON.stringify(nativeEvent));
                }}
                actions={[
                  {
                    id: 'rename',
                    title: 'Rename',
                    titleColor: '#46F289',
                    subtitle: 'Share action on SNS',
                    image: Platform.select({
                      ios: 'pencil.and.outline',
                      android: 'ic_menu_share',
                    }),
                    imageColor: 'black',
                  },
                  {
                    id: 'destructive',
                    title: 'Remove',
                    attributes: {
                      destructive: true,
                    },
                    image: Platform.select({
                      ios: 'trash',
                      android: 'ic_menu_delete',
                    }),
                  },
                ]}
                shouldOpenOnLongPress={true}
              >
                <TouchableOpacity style={styles.artifactDetailsContainer}>
                  <Text style={styles.artifactLabel}>{item.title}</Text>
                  <Text style={styles.sizeLabel}>{item.size}</Text>
                </TouchableOpacity>
              {/* <View style={styles.flexGrow} /> */}
              </MenuView>
            </View>
          ))}
        </View>
        </LinearGradient>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>24 hours</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={1}
          maximumValue={1095}
          value={100}
          onValueChange={handleValueChange}
          minimumTrackTintColor='cyan'
          maximumTrackTintColor='lightgray'
        />
        <Text style={styles.sliderLabel}>3 years</Text>
        </View>
        <Text style={styles.durationLabel}>Your Mem will be stored for {displayedNumber} {displayedPeriod}.</Text>
        <PrimaryButton onPress={doMint}>Mint for {(duration * 0.00175).toFixed(3)} MEMS</PrimaryButton>
      </View>
  )
}

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
  assemblyTitleContainer: {
    marginTop: -100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
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
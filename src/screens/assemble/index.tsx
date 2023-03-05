import React, { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import useTheme from '../../hooks/useTheme';
import { navigate } from '../../navigation';
import { Icons } from '../../assets/icons';

export type NavigatorParamList = {
  start: undefined,
  assembling: undefined,
  minting: undefined,
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

type ItemProps = {name: string, rssi: number, id: string, selected: boolean};

const Item = ({name, id, rssi}: ItemProps) => {

  // const N = 2.4;
  // const rssiAtOneMeter = -44;
  // const distance = Math.round(Math.pow(10, ((rssiAtOneMeter - rssi)/(10*N))));

  return (
    <View>
      <Text>test</Text>
    </View>
  )
  // return (
  //   <View style={nodesStyles.container}>
  //     <View style={nodesStyles.stack}>
  //       <Text style={nodesStyles.name}>{name}</Text>
  //     </View>
  //     <Text style={nodesStyles.rssi}>{distance} meters</Text>
  //   </View>
  // )
};

const AssembleStart = () => {
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
      console.log('setting data')
      setData([
        {
          id: '0x3acf9e8a67',
          name: 'mconstant.eth',
          distance: 3,
          selected: false,
        }
      ])
    }, 3000);
  }

  const handleItemSelected = (item: ItemProps) => {
    setData([
      {
        id: '0x3acf9e8a67',
        name: 'mconstant.eth',
        distance: 3,
        selected: true,
      }
    ])
    setShowStart(true);
  }

  const handleStart = () => {
    navigate('assembling')
  }

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
          <View style={{height: 40}} />
          {showStart && <PrimaryButton onPress={handleStart}>Start</PrimaryButton>}
      </View> :
      <View style={styles.assembleContainer}>
      <Text style={styles.assembleTitle}>Start assembling to create content with your friends!</Text>
        <PrimaryButton onPress={startAssembly}>Assemble</PrimaryButton>
      </View>}
    </>
  )
}

const Assembling = () => {
  const finishAssembly = () => {

  }

  const [options] = useState([
    {
      name: 'Create a Note',
      icon: <Icons.note color={'#F3B421'} size={30} />,
      color: '#F3B421',
    },
    {
      name: 'Record Audio',
      icon: <Icons.audio color={'red'} size={30} />,
      color: 'red',
    },
    {
      name: 'Add Photo/Video',
      icon: <Icons.camera color={'magenta'} size={30} />,
      color: 'magenta',
    },
  ])

  return (
      <View style={styles.assembleContainer}>
        <View style={styles.optionsContainer}>
        {options.map(option => (
          <View style={{...styles.optionContainer, borderColor: option.color }}>
            {option.icon}
            <Text style={styles.optionTitle}>{option.name}</Text>
            </View>
        ))}
        </View>
        <PrimaryButton onPress={finishAssembly}>Finish</PrimaryButton>
        <TouchableOpacity style={styles.leaveButton}>
          <Text style={styles.leaveButtonText}>Leave Assembly</Text>
        </TouchableOpacity>
      </View>
  )
}

const Minting = () => {
  const doMint = () => {

  }

  return (
    <View>
      <View style={styles.assembleContainer}>
        <Text style={styles.assembleTitle}>Start assembling to create content with your friends!</Text>
        <PrimaryButton onPress={doMint}>Mint this NFT</PrimaryButton>
      </View>
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
      <Stack.Screen name='minting' component={Minting} />
      
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
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

const nodesStyles = StyleSheet.create({
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
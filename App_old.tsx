/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, PropsWithChildren} from 'react';
import C3POReactNativeBle from '@secretarium/react-native-ble';
import uuid from 'react-native-uuid';
import {
  ActivityIndicator,
  FlatList,
  NativeEventEmitter,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
} from 'react-native';
import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import "@ethersproject/shims"
import {ethers} from 'ethers';

const MMSDK = new MetaMaskSDK({
  openDeeplink: link => {
    Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
  },
  timer: BackgroundTimer, // To keep the app alive once it goes to background
  dappMetadata: {
    name: 'My App', // The name of your application
    url: 'https://myapp.com', // The url of your website
  },
});

const ethereum = MMSDK.getProvider();

const provider = new ethers.providers.Web3Provider(ethereum);

const eventEmitter = new NativeEventEmitter(C3POReactNativeBle);


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [availableDevices, setAvailableDevices] = useState({});
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [rerenderList, setRerenderList] = useState(true);
  const [deviceName, setDeviceName] = useState('My Device');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  type BluetoothEvent = {
    name: string;
    identifier: string;
    services: Array<string>;
    txPower: number;
    rssi: number;
  };

  const deviceDiscovered = (event: BluetoothEvent) => {
    var newAvailableDevices = availableDevices;
    if (event.name && event.name.startsWith('worldlines-')) {
      // remove the wordlines- prefix
      var newEvent = event;
      newEvent.name = event.name.substring(11);
      newAvailableDevices[event.identifier] = newEvent;
      newAvailableDevices.loading = {id: 'loading'};
      setAvailableDevices(newAvailableDevices);
      setRerenderList(!rerenderList);
    }
  };

  const startBroadast = async () => {
    setIsBroadcasting(true);
    await C3POReactNativeBle.setManufacturerId(0xffff);
    await C3POReactNativeBle.broadcast(uuid.v4(), deviceName, [123]);
    const subscription = eventEmitter.addListener(
      'onDeviceFound',
      deviceDiscovered,
    );
    await C3POReactNativeBle.scan();
  };

  const connectMetamask = async () => {
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    console.log(accounts);
    // const publickey = await ethereum.request({
    //   method: 'eth_getEncryptionPublicKey',
    //   params: [accounts[0]], // you must have access to the specified account
    // })
    // console.log(publickey);
    const key = await provider.send('eth_getEncryptionPublicKey', accounts[0]);
    console.log(key);
    // const signer = provider.getSigner();
    // var name = await provider.lookupAddress(accounts[0]);

    // console.log('ENS name is ' + name);
  };

  const testTransaction = async () => {

  }

  type ItemProps = {name: string; rssi: number; id: string};

  const Item = ({name, id, rssi}: ItemProps) => {
    const N = 2.4;
    const rssiAtOneMeter = -44;
    const distance = Math.round(
      Math.pow(10, (rssiAtOneMeter - rssi) / (10 * N)),
    );
    if (id === 'loading') {
      return (
        <View style={nodesStyles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={nodesStyles.container}>
        <View style={nodesStyles.stack}>
          <Text style={nodesStyles.name}>{name}</Text>
        </View>
        <Text style={nodesStyles.rssi}>{distance} meters</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text />
      <Text style={styles.inviteTitle}>Invite Members</Text>
      <TextInput onChangeText={text => setDeviceName(text)} />
      <Button title="Metamask" onPress={connectMetamask} />
      {!isBroadcasting ? (
        <Button onPress={startBroadast} title="Start Broadcast" />
      ) : (
        <>
          <FlatList
            style={styles.listContainer}
            data={Object.keys(availableDevices)}
            renderItem={({item}) => (
              <Item
                name={availableDevices[item].name}
                id={item}
                rssi={availableDevices[item].rssi}
              />
            )}
            keyExtractor={item => item}
            extraData={rerenderList}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const nodesStyles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
  },
  container: {
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    margin: 5,
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
    color: 'white',
  },
  id: {
    fontSize: 10,
    color: 'gray',
  },
  rssi: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
});

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  inviteTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

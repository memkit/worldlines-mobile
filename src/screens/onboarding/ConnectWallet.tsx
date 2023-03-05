import React from 'react';
import { Text, View } from 'react-native';
import { Icons } from '../../assets/icons';
import PrimaryButton from '../../components/PrimaryButton';
import { useThemeAwareObject } from '../../hooks/useThemeAwareObject';
import { navigate } from '../../navigation';
import { routes } from '../../navigation/Routes';
import createStyles from './styles';
import BackgroundTimer from 'react-native-background-timer';
import MetaMaskSDK from '@metamask/sdk';
import { Linking } from 'react-native';

const MMSDK = new MetaMaskSDK({
  openDeeplink: (link) => {
    Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
  },
  timer: BackgroundTimer, // To keep the app alive once it goes to background
  dappMetadata: {
    name: 'My App', // The name of your application
    url: 'https://myapp.com', // The url of your website
  },
});

const ethereum = MMSDK.getProvider();

export const ConnectWallet = () => {
  const styles = useThemeAwareObject(createStyles);

  const connectMetamask = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate(routes.home);
  }


  return (
    <View style={styles.connectContainer}>
      <Text style={styles.connectTitle}>Connect Your Wallet</Text>
      <PrimaryButton startIcon={<Icons.metamask color={''} />} height={80} onPress={connectMetamask}>Connect MetaMask Wallet</PrimaryButton>
    </View>
  );
};

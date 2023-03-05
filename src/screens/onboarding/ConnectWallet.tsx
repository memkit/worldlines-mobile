import React from 'react';
import { Text, View } from 'react-native';
import { Icons } from '../../assets/icons';
import PrimaryButton from '../../components/PrimaryButton';
import { useThemeAwareObject } from '../../hooks/useThemeAwareObject';
import { navigate } from '../../navigation';
import { routes } from '../../navigation/Routes';
import createStyles from './styles';

export const ConnectWallet = () => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.connectContainer}>
      <Text style={styles.connectTitle}>Connect Your Wallet</Text>
      <PrimaryButton startIcon={<Icons.metamask color={''} />} height={80} onPress={() => {navigate(routes.home)}}>Connect MetaMask Wallet</PrimaryButton>
    </View>
  );
};

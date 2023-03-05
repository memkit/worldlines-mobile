import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NftView } from '../../components/NftView';

export const Lines = () => {
  const nfts = ['clever-octopus','swifty-giraffe','agile-cobra']
  return (
    <View>
      <ScrollView style={{paddingTop: 10}}>
        <NftView name={'clever-octopus'} />
        <NftView name={'swifty-giraffe'} />
        <NftView name={'agile-cobra'} />
      </ScrollView>
    </View>
  )
}
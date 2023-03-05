import React, { useState } from 'react';
import { Dimensions, Image, Text, useColorScheme, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import PrimaryButton from '../../components/PrimaryButton';
import { useThemeAwareObject } from '../../hooks/useThemeAwareObject';
import createStyles from './styles';
import { navigate } from '../../navigation';

export const Tutorial = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useThemeAwareObject(createStyles);
  const { width, height } = Dimensions.get('window');

  const [data] = useState([
    {
      content: 'WorldLines is an app that helps you and your team securely share content together.',
      lightImage: require('../../assets/images/slider-1-light.png'),
      darkImage: require('../../assets/images/slider-1-dark.png'),
    },
    {
      content: 'To group up, press Assemble. Or choose to be a lone wolf badass!',
      lightImage: require('../../assets/images/slider-2-light.png'),
      darkImage: require('../../assets/images/slider-2-dark.png'),
    },
    {
      content: 'After you have assembled you can start recording and adding encrypted media on a timeline.',
      lightImage: require('../../assets/images/slider-3-light.png'),
      darkImage: require('../../assets/images/slider-3-dark.png'),
    },
    {
      content: 'Everything is encrypted on your device, and you maintain sovereignty.',
      lightImage: require('../../assets/images/slider-4-light.png'),
      darkImage: require('../../assets/images/slider-4-dark.png'),
    },
    {
      content: 'Should you decide to market your content as an influencer, you can release it on YOUR terms.',
      lightImage: require('../../assets/images/slider-5-light.png'),
      darkImage: require('../../assets/images/slider-5-dark.png'),
    },
    {
      content: "It's OpenSea for ideas, but creators are in the driver's seat.",
      lightImage: require('../../assets/images/slider-6-light.png'),
      darkImage: require('../../assets/images/slider-6-dark.png'),
    },
  ]);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerContainer}>
      </View>
      <Carousel
        width={width}
        height={height - 250}
        data={data}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <View
            style={styles.carouselSlideContainer}
          >
            <View style={styles.carouselImageContainer}>
              <Image source={isDarkMode ? data[index].darkImage : data[index].lightImage} style={styles.carouselImage} />
            </View>
            <Text style={styles.carouselTextContent}>{data[index].content}</Text>
          </View>
        )} />
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={() => { navigate('connectWallet'); }}>Continue</PrimaryButton>
      </View>
    </View>
  );
};

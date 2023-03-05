import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Icons } from '../assets/icons';
import LinearGradient from "react-native-linear-gradient";
import { MenuView } from '@react-native-menu/menu';
import { styles } from '../screens/assemble/index';

const MyMenuView = ({children, ...props}: any) => {
  return (
    <MenuView
    title="Added by mconstant.eth"
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
              {children}
            </MenuView>
  )
}

export const NftView = ({name, allowEdit = false}: any) => {
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
  });

  return (
    <View>
    <View style={allowEdit ? styles.assemblyTitleContainerNegative : styles.assemblyTitleContainer}>
        <Text style={styles.assemblyTitle}>{name}</Text>
        {allowEdit && <TouchableOpacity>
          <Icons.edit color='darkgray' size={30} />
        </TouchableOpacity>}
      </View>
    <LinearGradient
      colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
      style={styles.nftGradient}
    >
      <View style={styles.nftContainer}>
        <View style={styles.nftRowContainer}>
          <View style={styles.nftTimeContainer}>
            <View style={styles.nftTimeLine} />
            <View style={styles.nftTimeDot} />
            <Text style={styles.nftTimestampLabel}>4:02AM</Text>
            <View style={styles.nftTimeDot} />
            <View style={styles.nftTimeLine} />
          </View>
          <Icons.note color={'#F3B421'} size={30} />
          <MyMenuView>
            <TouchableOpacity style={styles.artifactDetailsContainer}>
              <Text style={styles.artifactLabel}>Agenda</Text>
              <Text style={styles.sizeLabel}>2Kb</Text>
            </TouchableOpacity>
          </MyMenuView>
        </View>
        <View style={styles.nftRowContainer}>
          <View style={styles.nftTimeContainer}>
            <View style={styles.nftTimeLine} />
            <View style={styles.nftTimeDot} />
            <Text style={styles.nftTimestampLabel}>4:05AM</Text>
            <View style={styles.nftTimeDot} />
            <View style={styles.nftTimeLine} />
          </View>
          <Icons.camera color={'magenta'} size={30} />
          <MyMenuView>
            <TouchableOpacity style={styles.artifactDetailsContainer}>
              <Text style={styles.artifactLabel}>Whiteboard Drawing</Text>
              <Text style={styles.sizeLabel}>4Mb</Text>
            </TouchableOpacity>
          </MyMenuView>
        </View>
        <View style={styles.nftRowContainer}>
          <View style={styles.nftTimeContainer}>
            <View style={styles.nftTimeLine} />
            <View style={styles.nftTimeDot} />
            <Text style={styles.nftTimestampLabel}>4:11AM</Text>
            <View style={styles.nftTimeDot} />
            <View style={styles.nftTimeLine} />
          </View>
          <Icons.audio color={'red'} size={30} />
          <MyMenuView>
            <TouchableOpacity style={styles.artifactDetailsContainer}>
              <Text style={styles.artifactLabel}>My Commentary</Text>
              <Text style={styles.sizeLabel}>35Kb</Text>
            </TouchableOpacity>
          </MyMenuView>
        </View>
      </View>
    </LinearGradient>
    </View>
  );
};

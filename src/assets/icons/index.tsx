import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Image } from 'react-native';
interface TabBarProps {
    color: string
    size ?: number
}
const defaultTabBarPropsValue = {
    color: 'black',
    size: 24,
}
export const Icons = {
    note: (props: TabBarProps = defaultTabBarPropsValue) => <FontAwesome
        name="sticky-note"
        size={props.size}
        color={props.color} />,
    audio: (props: TabBarProps = defaultTabBarPropsValue) => <MaterialIcons
        name="multitrack-audio"
        size={props.size}
        color={props.color} />,
    camera: (props: TabBarProps = defaultTabBarPropsValue) => <FontAwesome
        name="camera-retro"
        size={props.size}
        color={props.color} />,
    metamask: (props: TabBarProps = defaultTabBarPropsValue) => <Image
    style={{height: 50, width: 50}}
        source={require('../images/metamask.png')} />,
    close: (props: TabBarProps = defaultTabBarPropsValue) => <AntDesign
        name="closecircle"
        size={props.size}
        color={props.color} />,
    tabBarAssemble: (props: TabBarProps = defaultTabBarPropsValue) => <MaterialCommunityIcons
        name="guy-fawkes-mask"
        size={props.size}
        color={props.color} />,
    tabBarWorld: (props: TabBarProps = defaultTabBarPropsValue) => <Entypo
        name="network"
       size={props.size}
        color={props.color} />,
    tabBarLines: (props: TabBarProps = defaultTabBarPropsValue) => <MaterialCommunityIcons
        name="memory"
       size={props.size}
        color={props.color} />,
    headerAccount: (props: TabBarProps = defaultTabBarPropsValue) => <MaterialCommunityIcons
        name="account-circle-outline"
       size={props.size}
        color={props.color} />,

}
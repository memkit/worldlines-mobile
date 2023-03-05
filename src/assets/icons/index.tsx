import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
interface TabBarProps{
    color: string
    size ?: number
}
const defaultTabBarPropsValue = {
    color: 'black',
    size: 24
}
export const Icons = {
    tabBarAssemble: (props: TabBarProps = defaultTabBarPropsValue) => <MaterialCommunityIcons
        name="guy-fawkes-mask"
        size={props.size}
        color={props.color} />,
    tabBarWorld: (props: TabBarProps = defaultTabBarPropsValue) => <Entypo
        name="network"
       size={props.size}
        color={props.color} />,
    tabBarLines: (props: TabBarProps = defaultTabBarPropsValue) => <Feather
        name="wind"
       size={props.size}
        color={props.color} />,
    headerAccount: (props: TabBarProps = defaultTabBarPropsValue) => <MaterialCommunityIcons
        name="account-circle-outline"
       size={props.size}
        color={props.color} />,

}
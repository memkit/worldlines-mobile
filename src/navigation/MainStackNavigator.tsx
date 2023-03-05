import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
    Onboarding,
    Assemble,
    World,
    Lines,
    Profile,
} from "../screens"
import HomeTabNavigator from './HomeTabNavigator'
import { routes, screenStaticTitle } from "./Routes"
import createStyles from "./styles"
import {useThemeAwareObject} from "../hooks/useThemeAwareObject"
import { Button, Text, TouchableOpacity } from "react-native"
import { Icons } from "../assets/icons"
import { navigate, RootNavigation } from "./NavigationUtilities"
import useTheme from "../hooks/useTheme"
import GradientText from "../components/GradientText"
import { currentRouteSelector } from "../store/common"
import { useSelector } from 'react-redux';



export type NavigatorParamList = {
    onboarding: undefined,
    home: undefined,
    profile: undefined,
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

export const MainStackNavigator = () => {
    const { AppTheme } = useTheme();
    const currentRouteName = useSelector(currentRouteSelector);
    const [disallowedProfileRoutes] = useState([
        'onboarding',
        'connectWallet'
    ]);

    const styles = useThemeAwareObject(createStyles);

    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerShown: true,
                headerTitle: () => (
                    <GradientText startColor={AppTheme.color.palette.cyan} endColor={AppTheme.color.palette.magenta} style={styles.headerTitleStyle}>TimeLines</GradientText>
                ),
                headerTitleStyle: styles.headerTitleStyle,
                headerShadowVisible: false,
                headerStyle: styles.headerBackgroundStyle,
                headerRight: () => {
                    if (disallowedProfileRoutes.includes(currentRouteName)) {
                        return <></>
                    } else {
                        return (
                            <TouchableOpacity onPress={() => {navigate(routes.profile)}}>
                                <Icons.headerAccount size={30} color={AppTheme.color.tabBarNavigation.tabBarActiveTintColor} />
                            </TouchableOpacity>
                        )
                    }
            },
            }}
            initialRouteName={routes.onboarding}
            >
            <Stack.Screen name={routes.onboarding} component={Onboarding} options={{}} />
            <Stack.Screen name={routes.home} options={{headerTitleStyle: styles.headerTitleStyle }} component={HomeTabNavigator} />
            <Stack.Screen name={routes.profile} component={Profile} options={{ title: screenStaticTitle.profile }} />
        </Stack.Navigator>
    )
}
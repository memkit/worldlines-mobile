import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import createStyles from "./styles"
import { routes, screenStaticTitle } from "./Routes"
import { Icons } from '../assets/icons'
import useTheme from '../hooks/useTheme'
import { useThemeAwareObject } from "../hooks/useThemeAwareObject"
import { Assemble, Lines, World } from '../screens'


const Tab = createBottomTabNavigator()

// @refresh reset
const HomeTabNavigator = () => {
    const { AppTheme } = useTheme()
    const styles = useThemeAwareObject(createStyles)

    return (
        <Tab.Navigator
            screenOptions={(route) => ({
                headerShown: false,
                tabBarActiveTintColor: AppTheme.color.tabBarNavigation.tabBarActiveTintColor,
                tabBarInactiveTintColor: AppTheme.color.tabBarNavigation.tabBarInactiveTintColor
            })}
        >
            <Tab.Screen
                name="Assemble"
                options={(route) => ({
                    tabBarLabel: 'Assemble',
                    tabBarLabelStyle: styles.tabBarText,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Icons.tabBarAssemble color={color} size={size} />
                    },
                })}
                component={Assemble}
            />
            <Tab.Screen
                name="World"
                options={(route) => ({
                    tabBarLabel: 'World',
                    tabBarLabelStyle: styles.tabBarText,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Icons.tabBarWorld color={color} size={size} />
                    },
                })}
                component={World}
            />
            <Tab.Screen
                name="Lines"
                options={(route) => ({
                    tabBarLabel: 'Lines',
                    tabBarLabelStyle: styles.tabBarText,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Icons.tabBarLines color={color} size={size} />
                    },
                })}
                component={Lines}
            />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator

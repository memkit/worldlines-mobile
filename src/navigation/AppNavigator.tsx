
import React from "react"
import { NavigationContainer} from "@react-navigation/native"
import { navigationRef, useBackButtonHandler } from "./NavigationUtilities"
import { MainStackNavigator } from './MainStackNavigator'
import useTheme from "../hooks/useTheme"

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: NavigationProps) => {
    const theme = useTheme()
    useBackButtonHandler(canExit)
    return (
        <NavigationContainer
            ref={navigationRef}
            theme={theme.NavigationTheme}
            {...props}
        >
            <MainStackNavigator />
        </NavigationContainer>
    )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes: Array<string> = []
export const canExit = (routeName: string) => exitRoutes.includes(routeName)

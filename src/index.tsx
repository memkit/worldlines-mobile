/**
 * WorldLines App
 *
 * All the navigations , routes, storage injection goes here
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { PersistGate } from 'redux-persist/es/integration/react'
import { AppNavigator, useNavigationPersistence } from "./navigation"
import * as Storage from "./utilities/storage"
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen';
import { persistor, store } from './store'

export interface Props { }

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"
// TODO:: Update  here navigation
export const App: React.FC<Props> = () => {

    const onBeforeLift = () => {
        SplashScreen.hide()
        // take some action before the gate lifts
    }

    const {
        initialNavigationState,
        onNavigationStateChange,
        isRestored: isNavigationStateRestored,
    } = useNavigationPersistence(Storage, NAVIGATION_PERSISTENCE_KEY)

    return <Provider store={store}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <PersistGate
                    onBeforeLift={onBeforeLift}
                    persistor={persistor}>
                    <AppNavigator
                        initialState={initialNavigationState}
                        onStateChange={onNavigationStateChange}
                    />
                </PersistGate>
        </SafeAreaProvider>
    </Provider>
}
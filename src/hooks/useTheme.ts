import { useColorScheme, ColorSchemeName } from 'react-native'
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native'
import {AppDarkTheme, AppLightTheme, metrics, fontFamily, WP, HP} from '../themes'

export default function () {
  const colorScheme: ColorSchemeName = useColorScheme()
  const isDarkMode = colorScheme === 'dark'


  const NavigationTheme : Theme = isDarkMode ? DarkTheme: DefaultTheme
  const AppTheme = isDarkMode ? AppDarkTheme: AppLightTheme
  
  return {NavigationTheme, AppTheme}
}

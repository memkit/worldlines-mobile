import { StyleSheet } from "react-native"
import { AppThemeProps } from '../themes'

export const createStyles = (theme: AppThemeProps) =>  StyleSheet.create({
    profileIcon: {
        color: theme.color.primary,
    },
    bottomIcon:  {
        height: theme.WP('5'),
        width: theme.WP('5'),
        resizeMode: 'contain',
    },
    headerBackgroundStyle: {
        shadowColor: 'transparent',
        backgroundColor: '#f2f2f2',
    },
    tabBarText: {
        fontSize: theme.WP('2.8'),
    },
    headerTitleStyle:{
        fontWeight: '700',
        paddingTop: 4,
        fontSize:24,
        letterSpacing: 1.5
      }
});
export default createStyles
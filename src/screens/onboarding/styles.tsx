import { StyleSheet } from "react-native"
import { AppThemeProps } from "../../themes";

export const createStyles = (theme: AppThemeProps) =>  StyleSheet.create({
    connectContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    connectTitle: {
        fontSize: 30,
        fontWeight: '500',
        letterSpacing: 1.1,
        padding: 50,
        textAlign: 'center',
        paddingTop: 200,
    },
    parentContainer: {
        flex: 1,
    },
    carouselTextContent: {
        textAlign: 'center',
        fontSize: 20,
        padding: 20,
        paddingBottom: 60,
        letterSpacing: 1.1,
        fontWeight: '500',
        color: theme.color.text
    },
    carouselSlideContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    carouselImageContainer: {
        height: 250,
        // backgroundColor: 'red',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselImage: {
        height: 200,
        width: 200,
    },
    buttonContainer: {
        height: 50,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    bottomIcon:  {
        height: theme.WP('5'),
        width: theme.WP('5'),
        resizeMode: 'contain',
    },
    headerBackgroundStyle: {
        shadowColor: 'transparent',
        backgroundColor: theme.color.defaultbg,
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
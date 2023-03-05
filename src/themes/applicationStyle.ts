import { StyleSheet } from "react-native"


// Update application style here. This is common style for entire applications
const ApplicationStyles = (theme: any) => StyleSheet.create({
  fullScreen: { flex: 1 },
  container: {
    // backgroundColor: color.transparent,
    // paddingHorizontal: spacing[4],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    // paddingTop: spacing[3],
    // paddingBottom: spacing[4] + spacing[1],
    paddingHorizontal: 0,
  },
  headerTitle: {
    // color: color.palette.black,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  backgroundPrimary: {
    backgroundColor: theme.color.primary,
  },
  backgroundReset: {
    backgroundColor: theme.color.transparent,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.color.text,
    backgroundColor: theme.color.inputBackground,
    color: theme.color.text,
    minHeight: 50,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colVCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  colHCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  /* Row Layouts */
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowHCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* Default Layouts */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  /* Operation Layout */
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
  rotate90Inverse: {
    transform: [{ rotate: '-90deg' }],
  },
  bottomIcon: {
    height: theme.WP('5'),
    width: theme.WP('5'),
    resizeMode: 'contain',
  },
  tabBarText: {
    fontSize: theme.WP('2.8'),
  },
  textSmall: {
    fontSize: theme.fontSize.small,
    color: theme.colors.text,
  },
  textRegular: {
    fontSize: theme.fontSize.regular,
    color: theme.colors.text,
  },
  textLarge: {
    fontSize: theme.fontSize.large,
    color: theme.colors.text,
  },
  titleSmall: {
    fontSize: theme.fontSize.small * 2,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  titleRegular: {
    fontSize: theme.fontSize.regular * 2,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  titleLarge: {
    fontSize: theme.fontSize.large * 2,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
});
export default ApplicationStyles
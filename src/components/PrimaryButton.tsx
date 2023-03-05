import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Icons } from "../assets/icons";
import useTheme from "../hooks/useTheme";

type PrimaryButtonProps = {
  children: string,
  height?: number,
  startIcon?: React.ReactNode,
  onPress: (event: GestureResponderEvent) => void,
}

const PrimaryButton = ({children, startIcon, height = 50, onPress, ...props}: PrimaryButtonProps) => {
  const { AppTheme } = useTheme()

  return (
    <TouchableOpacity style={{...styles.button, height }} onPress={onPress}>
    <LinearGradient
        colors={[AppTheme.color.palette.magenta, AppTheme.color.palette.blue]}
        start={{ x: 0, y: -2 }}
        end={{ x: 1, y: 2 }}
      style={styles.gradient}>
      {startIcon ? <View style={{paddingRight: 20, paddingLeft: 0,}}>
      {startIcon}
      </View> : null}
      <Text style={styles.text}>{children}</Text>
    </LinearGradient>
  </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingLeft: 40,
    paddingRight: 40,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    shadowColor: 'red',
    shadowOpacity: 1,
    display: 'flex',
    shadowOffset: { width: 4, height: 4},
    shadowRadius: 0,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 1.5,
    fontFamily: 'courier'
  },
});

export default PrimaryButton;

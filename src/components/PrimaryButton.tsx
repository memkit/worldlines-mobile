import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import LinearGradient from "react-native-linear-gradient";
import useTheme from "../hooks/useTheme";

type PrimaryButtonProps = {
  children: string,
}

const PrimaryButton = ({children, ...props}: PrimaryButtonProps) => {
  const { AppTheme } = useTheme()

  return (
    <TouchableOpacity style={styles.button}>
    <LinearGradient
        colors={[AppTheme.color.palette.magenta, AppTheme.color.palette.blue]}
        start={{ x: 0, y: -2 }}
        end={{ x: 1, y: 2 }}
      style={styles.gradient}>
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
  },
  button: {
    height: 50,
    shadowColor: 'red',
    shadowOpacity: 1,
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

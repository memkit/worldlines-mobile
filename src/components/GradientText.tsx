import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import LinearGradient from "react-native-linear-gradient";
    
const GradientText = ({startColor, endColor, ...props}: any) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[startColor, endColor]}
        start={{ x: 0, y: -1 }}
        end={{ x: 1, y: 2 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;

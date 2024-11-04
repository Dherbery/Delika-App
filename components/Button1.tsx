import React, { useMemo } from "react";
import { Image } from "expo-image";
import { TouchableOpacity } from 'react-native'; // Add this import
import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding,
  Gap,
} from "../GlobalStyles";

export type Button1Type = {
  button?: string;
  type?: string;
  variant?: string;

  /** Style props */
  buttonPosition?: string;
  buttonTop?: number | string;
  buttonLeft?: number | string;
  buttonWidth?: number | string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Button1 = ({
  button,
  buttonPosition,
  buttonTop,
  buttonLeft,
  buttonWidth,
  onPress, // Add this prop
}: Button1Type) => {
  const buttonStyle = useMemo(() => {
    return {
      ...getStyleValue("position", buttonPosition),
      ...getStyleValue("top", buttonTop),
      ...getStyleValue("left", buttonLeft),
      ...getStyleValue("width", buttonWidth),
    };
  }, [buttonPosition, buttonTop, buttonLeft, buttonWidth]);

  return (
    <TouchableOpacity 
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        style={styles.icon}
        contentFit="cover"
        source={require("../assets/icon3.png")}
      />
      <Text style={styles.button1}>{button}</Text>
      <Image
        style={styles.icon}
        contentFit="cover"
        source={require("../assets/icon3.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    overflow: "hidden",
    display: "none",
  },
  button1: {
    fontSize: FontSize.bodyMediumSemiBold_size,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: FontFamily.bodyMediumSemiBold,
    color: Color.neutral10,
    textAlign: "center",
  },
  button: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorOrangered,
    width: 327,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.p_base,
    gap: Gap.gap_md,
  },
});

export default Button1;

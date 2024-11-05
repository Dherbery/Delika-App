import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding,
  Gap,
} from "../styles/GlobalStyles";

export type EmailInput2Type = {
  /** Variant props */
  icon?: "Left" | false;
  state?: "Filled";
  type?: "Default";
};

const EmailInput2 = ({
  icon = false,
  state = "Filled",
  type = "Default",
}: EmailInput2Type) => {
  return (
    <View style={styles.input}>
      <View style={styles.input1}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/icon.png")}
        />
        <Text style={styles.enterEmail}>Enter Email</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  enterEmail: {
    flex: 1,
    fontSize: FontSize.bodyMediumSemiBold_size,
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: FontFamily.bodyMediumMedium,
    color: Color.neutral60,
    textAlign: "left",
  },
  input1: {
    alignSelf: "stretch",
    borderRadius: Border.br_99xl,
    backgroundColor: Color.neutral10,
    borderStyle: "solid",
    borderColor: Color.colorWhitesmoke,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: Padding.p_base,
    gap: Gap.gap_md,
  },
  input: {
    borderRadius: Border.br_5xs,
    width: 327,
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 230,
  },
});

export default EmailInput2;

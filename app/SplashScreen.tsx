import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";

const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <View style={styles.uiwloading}>
        <Image
          style={styles.vectorIcon}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
      </View>
      <View style={styles.logo}>
        <Image
          style={styles.vectorIcon1}
          contentFit="cover"
          source={require("../assets/vector1.png")}
        />
        <Text style={styles.delika}>Delika</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIcon: {
    width: 32,
    height: 32,
  },
  uiwloading: {
    marginLeft: -9.5,
    top: 686,
    left: "50%",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIcon1: {
    height: "50.12%",
    width: "28.17%",
    top: "0%",
    right: "36%",
    bottom: "49.88%",
    left: "35.83%",
    borderRadius: 3,
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  delika: {
    top: 66,
    left: 0,
    fontSize: 40,
    letterSpacing: 0,
    lineHeight: 16,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.neutral10,
    textAlign: "center",
    position: "absolute",
  },
  logo: {
    height: "10.1%",
    width: "32%",
    top: "47.41%",
    right: "34.13%",
    bottom: "42.49%",
    left: "33.87%",
    position: "absolute",
  },
  splashScreen: {
    backgroundColor: Color.baseBlack,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default SplashScreen;

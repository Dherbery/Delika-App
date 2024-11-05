import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Animated, Easing } from "react-native";
import { FontFamily, Color } from "../GlobalStyles";
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Index: undefined;
  Onboarding1: undefined;
  // Add other screens here
};

const SplashScreen = () => {
  const rotateValue = new Animated.Value(0);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Index'>>();

  useEffect(() => {
    // Create rotation animation
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Existing navigation timer
    const timer = setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.splashScreen}>
      <View style={styles.uiwloading}>
        <Animated.Image
          style={[styles.vectorIcon, { transform: [{ rotate: spin }] }]}
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
    top: "-5%",
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
    top: 62,
    left: 20,
    fontSize: 40,
    letterSpacing: 0,
    lineHeight: 40,
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
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import SplashModal from '../components/componentsSplashModal';
import { Color, Border, FontSize, FontFamily, Gap } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const Onboarding = () => {
  const [showSplash, setShowSplash] = React.useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSplashClose = () => {
    console.log('handleSplashClose called');
    setShowSplash(false);
    navigation.navigate('Onboarding1');
  };

  React.useEffect(() => {
    console.log('Navigation object:', navigation);
  }, [navigation]);

  return (
    <View style={styles.onboarding1}>
      <Image
        style={styles.onboarding1Child}
        contentFit="cover"
        source={require("../assets/group-770754.png")}
      />
      <Image
        style={styles.unionIcon}
        contentFit="cover"
        source={require("../assets/union.png")}
      />
      <View style={styles.other}>
        <View style={[styles.iphoneXstatusBarsstatusBa, styles.titlePosition]}>
          <View style={styles.rectangle} />
          <View style={styles.battery}>
            <View style={styles.border} />
            <Image
              style={styles.capIcon}
              contentFit="cover"
              source={require("../assets/cap.png")}
            />
            <View style={styles.capacity} />
          </View>
          <Image
            style={styles.wifiIcon}
            contentFit="cover"
            source={require("../assets/wifi.png")}
          />
          <Image
            style={styles.cellularConnectionIcon}
            contentFit="cover"
            source={require("../assets/cellular-connection.png")}
          />
          <View style={styles.timeStyle}>
            <Text style={[styles.time, styles.timeFlexBox]}>9:41</Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.f5b513b63b7aa681681f2e720275bIcon}
        contentFit="cover"
        source={require("../assets/924f5b513b63b7aa681681f2e720275b-1.png")}
      />
      <SplashModal
        visible={showSplash}
        onClose={handleSplashClose}
        onNextPress={() => {
          console.log('Next pressed - attempting navigation');
          navigation.navigate('Onboarding1');
        }}
      />
      <View style={[styles.title, styles.titlePosition]}>
        <Text style={[styles.letsBegin, styles.timeFlexBox]}>Let's begin!</Text>
        <Text style={styles.pleaseSignUp}>
        Please sign up or log in to take control of your dashboard
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  titlePosition: {
    left: "50%",
    position: "absolute",
  },
  timeFlexBox: {
    textAlign: "center",
    color: Color.neutral10,
  },
  onboarding1Child: {
    top: -432,
    left: -517,
    width: 917,
    height: 899,
    position: "absolute",
  },
  unionIcon: {
    width: 726,
    height: 499,
  },
  rectangle: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  border: {
    right: 2,
    borderRadius: Border.br_11xl,
    borderStyle: "solid",
    borderColor: Color.neutral10,
    borderWidth: 1,
    width: 22,
    opacity: 0.35,
    height: 11,
    top: 0,
    position: "absolute",
  },
  capIcon: {
    top: 4,
    right: 0,
    width: 1,
    height: 4,
    position: "absolute",
  },
  capacity: {
    top: 2,
    right: 4,
    borderRadius: Border.br_11xs_3,
    backgroundColor: Color.neutral10,
    width: 18,
    height: 7,
    position: "absolute",
  },
  battery: {
    top: 17,
    right: 15,
    width: 24,
    height: 11,
    position: "absolute",
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  time: {
    marginTop: -8,
    left: -1,
    fontSize: FontSize.bodyMediumSemiBold_size,
    letterSpacing: 0,
    lineHeight: 20,
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    textAlign: "center",
    width: 54,
    top: "50%",
    position: "absolute",
  },
  timeStyle: {
    top: 12,
    left: 21,
    height: 20,
    width: 54,
    position: "absolute",
  },
  iphoneXstatusBarsstatusBa: {
    marginTop: -22,
    marginLeft: -187.5,
    top: "50%",
    left: "50%",
    height: 44,
    width: 375,
    overflow: "hidden",
  },
  other: {
    left: 0,
    display: "none",
    height: 44,
    width: 375,
    top: 0,
    position: "absolute",
  },
  f5b513b63b7aa681681f2e720275bIcon: {
    top: 270,
    left: 80,
    width: 431,
    height: 393,
    position: "absolute",
  },
  letsBegin: {
    fontSize: FontSize.headingH4SemiBold_size,
    letterSpacing: -1,
    lineHeight: 36,
    fontWeight: "600",
    fontFamily: FontFamily.bodyMediumSemiBold,
    right: 279,
  },
  pleaseSignUp: {
    fontSize: FontSize.bodyLargeMedium_size,
    lineHeight: 24,
    textAlign: 'right',
    width: 250,
    color: Color.neutral10,
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    right: 170,
  },
  title: {
    position: 'absolute',
    right: 0,
    top: 153,
    justifyContent: "center",
    gap: Gap.gap_xs,
    alignItems: 'flex-end',
  },
  onboarding1: {
    backgroundColor: '#000000',
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default Onboarding;4
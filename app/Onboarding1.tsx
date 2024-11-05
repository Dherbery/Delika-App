import * as React from "react";
import { useFonts } from 'expo-font';
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import SignInEmpty from "../app/SignInEmpty";
import { Color, Border, FontSize, FontFamily, Gap } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import SplashModal2 from "../components/componentsSplashModal2";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


const Onboarding1 = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = React.useState(true);

  if (!fontsLoaded) {
    return null; // or a loading component
  }

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleNext = () => {
    console.log('handleNext called in Onboarding1');
    try {
      navigation.navigate('SignInEmpty');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };
   return (
    <View style={styles.onboarding2}>
      <Image
        style={styles.unionIcon}
        contentFit="cover"
        source={require("../assets/union.png")}
      />
      <Image
        style={styles.onboarding2Child}
        contentFit="cover"
        source={require("../assets/group-770754.png")}
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
        style={styles.a4741164498817f21f8475d7561f85Icon}
        contentFit="cover"
        source={require("../assets/9a4741164498817f21f8475d7561f855-1.png")}
      />
      <SplashModal2 
        visible={modalVisible}
        onClose={handleClose}
        onNextPress={handleNext}
        navigation={navigation}
      />
      <View style={[styles.title, styles.titlePosition]}>
        <Text style={[styles.letsGetStarted, styles.timeFlexBox]}>
          Let’s Get Started
        </Text>
        <Text style={styles.signUpOr}>{`Sign up or log in to
manage sales & orders`}</Text>
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
  unionIcon: {
    width: 726,
    height: 499,
  },
  onboarding2Child: {
    top: -432,
    left: -517,
    width: 917,
    height: 899,
    position: "absolute",
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
    borderRadius: Border.br_11xs_3,
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
  a4741164498817f21f8475d7561f85Icon: {
    top: 189,
    left: 130,
    width: 489,
    height: 436,
    position: "absolute",
  },
  letsGetStarted: {
    fontSize: FontSize.headingH4SemiBold_size,
    letterSpacing: -1,
    lineHeight: 36,
    fontWeight: "600",
    fontFamily: FontFamily.bodyMediumSemiBold,
  },
  signUpOr: {
    fontSize: FontSize.bodyLargeMedium_size,
    lineHeight: 24,
    textAlign: "left",
    color: Color.neutral10,
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
  },
  title: {
    marginLeft: -180,
    bottom: 650,
    justifyContent: "center",
    gap: Gap.gap_xs,
  },
  onboarding2: {
    backgroundColor: Color.baseBlack,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default Onboarding1;

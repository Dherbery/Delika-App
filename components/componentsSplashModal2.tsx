import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import Button1 from "./Button1";
import {
  Border,
  Color,
  Gap,
  FontSize,
  FontFamily,
  Padding,
} from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  visible: boolean;
  onClose: () => void;
  onNextPress: () => void;
  navigation: NativeStackNavigationProp<any>;
};

const SplashModal2: React.FC<Props> = ({ visible, onClose, onNextPress }) => {
  const handleButtonPress = () => {
    console.log('Button pressed in SplashModal2');
    onNextPress();
  };
  return (
    <View style={styles.content}>
      <View style={styles.slide}>
        <Image
          style={styles.slideChild}
          contentFit="cover"
          source={require("../assets/ellipse.png")}
        />
        <View style={styles.slideItem} />
        <Image
          style={styles.slideChild}
          contentFit="cover"
          source={require("../assets/ellipse.png")}
        />
      </View>
      <View style={styles.text}>
        <Text style={[styles.tittle, styles.bodyFlexBox]}>
          Top-notch {'\n'}management
        </Text>
        <Text style={[styles.body, styles.bodyFlexBox]}>
          Manage your inventory with less clicks and monitor sales on the go
        </Text>
      </View>
      <Button1
         type="Label & Icon"
         variant="Primary"
         button="Next"
         onPress={handleButtonPress}
         style={{
           width: 299
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bodyFlexBox: {
    textAlign: "center",
    alignSelf: "stretch",
  },
  slideChild: {
    width: 6,
    height: 6,
  },
  slideItem: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorOrangered,
    width: 24,
    height: 6,
  },
  slide: {
    flexDirection: "row",
    gap: Gap.gap_sm,
    alignItems: "center",
  },
  tittle: {
    fontSize: FontSize.headingH4SemiBold_size,
    letterSpacing: -1,
    lineHeight: 36,
    fontWeight: "600",
    fontFamily: FontFamily.bodyMediumSemiBold,
    color: Color.neutral100,
  },
  body: {
    fontSize: FontSize.bodyMediumSemiBold_size,
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: FontFamily.bodyMediumMedium,
    color: Color.neutral60,
  },
  text: {
    gap: Gap.gap_md,
    alignSelf: "stretch",
    alignItems: "center",
  },
  content: {
    position: "absolute",
    width: 350,
    height: 300,
    marginLeft: -90,
    bottom: 32,
    left: "30%",
    borderRadius: Border.br_11xl,
    backgroundColor: Color.neutral10,
    overflow: "hidden",
    padding: Padding.p_11xl,
    gap: Gap.gap_lg,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    marginTop: '120%',
  },
});

export default SplashModal2;

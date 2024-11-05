import * as React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, Platform } from "react-native";
import {
  FontFamily,
  FontSize,
  Border,
  Color,
  Gap,
  Padding,
} from "../GlobalStyles";
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Add type for your navigation routes
type RootStackParamList = {
  EnterYourEmail: undefined;
  EnterYourPhonenumber: undefined;
  
  // ... other screens
};

const ForgetPassword = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedOption, setSelectedOption] = useState('email');
  const [type, setType] = useState(false);
  const [fontsLoaded] = useFonts({
  });

  const handleOptionSelect = async (option: 'email' | 'phone') => {
    setSelectedOption(option);
    
    // Save the type and selected option to AsyncStorage
    try {
      await AsyncStorage.setItem('resetType', option);
      await AsyncStorage.setItem('isResetTypeSelected', 'true');
      
      // Navigate based on option
      if (option === 'email') {
        navigation.navigate('EnterYourEmail');
      } else {
        navigation.navigate('EnterYourPhonenumber');
      }
    } catch (error) {
      console.error('Error saving reset type:', error);
    }
  };

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View style={styles.forgotPassword}>
      <Image
        style={styles.forgotPasswordChild}
        contentFit="cover"
        source={require("../assets/group-770754.png")}
      />
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.forgetPassword}>
          <View style={styles.list}>
            <View style={styles.buttonFlexBox}>
              <Text
                style={[styles.forgotPassword1, styles.forgotPassword1FlexBox]}
              >
                Forgot password ?
              </Text>
              <Text style={[styles.pleaseSelectOption, styles.button1Layout]}>
                Please select option to send link reset password
              </Text>
            </View>
            <View style={styles.sendToYourEmailParent}>
              <TouchableOpacity 
                style={styles.sendToYourEmail}
                onPress={() => handleOptionSelect('email')}
              >
                <View style={[
                  styles.sendToYourEmailChild, 
                  styles.sendChildLayout,
                  { borderColor: selectedOption === 'email' ? Color.otherOrange : '#F5F5F5' }
                ]} />
                <View style={styles.check}>
                  <View style={[
                    styles.checkChild,
                    { 
                      backgroundColor: selectedOption === 'email' ? '#4CAF50' : 'transparent',
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: selectedOption === 'email' ? '#4CAF50' : '#F5F5F5'
                    }
                  ]}>
                    {selectedOption === 'email' && (
                      <AntDesign name="check" size={20} color="white" />
                    )}
                  </View>
                </View>
                <Image
                  style={[styles.sendToYourEmailItem, styles.checkChildLayout]}
                  contentFit="cover"
                  source={require("../assets/group 13405.png")}
                />
                <Text style={[styles.sendToYour, styles.sendTypo]}>
                  Send to your email
                </Text>
                <Text style={styles.linkResetWill}>
                  Link reset will be send to your email address registered
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.sendToYourEmail, { paddingLeft: 15 }]}
                onPress={() => handleOptionSelect('phone')}
              >
                <View style={[
                  styles.sendToYourEmailChild, 
                  styles.sendChildLayout,
                  { borderColor: selectedOption === 'phone' ? Color.otherOrange : '#F5F5F5' }
                ]} />
                <View style={styles.check}>
                  <View style={[
                    styles.checkChild,
                    { 
                      backgroundColor: selectedOption === 'phone' ? '#4CAF50' : 'transparent',
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: selectedOption === 'phone' ? '#4CAF50' : '#F5F5F5'
                    }
                  ]}>
                    {selectedOption === 'phone' && (
                      <AntDesign name="check" size={20} color="white" />
                    )}
                  </View>
                </View>
                <MaterialIcons 
                  name="local-phone" 
                  size={24} 
                  color="black"
                  style={[styles.sendToYourEmailItem]}
                />
                <Text style={[styles.sendToYour, styles.sendTypo]}>
                  Send to your Phone number
                </Text>
                <Text style={styles.linkResetWill}>
                  Link reset will be sent to your registered phone number
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomSection}>
            <View style={[styles.button, styles.buttonFlexBox]}>
              <Text style={[styles.button1, styles.button1Layout]}>Continue</Text>
            </View>
            <View style={styles.linkContainer}>
              <Text style={styles.didntReceiveLink}>Didn't receive link? </Text>
              <Text style={[styles.resendLink, styles.resendLinkTypo]}>Resend Link</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resendLinkTypo: {
    fontWeight: "500",
  },
  forgotPassword1FlexBox: {
    textAlign: "center",
    width: 327,
  },
  button1Layout: {
    lineHeight: 20,
    fontSize: FontSize.bodyMediumMedium_size,
  },
  sendChildLayout: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xl,
    left: 0,
    top: 0,
    height: 104,
    width: 335,
    backgroundColor: Color.neutral10,
    position: "absolute",
  },
  checkChildLayout: {
    height: 32,
    width: 32,
  },
  iconLayout: {
    zIndex: 1,
    maxHeight: "100%",
    maxWidth: "100%",
    width: "62.5%",
    height: "62.5%",
    position: "absolute",
    overflow: "hidden",
  },
  sendTypo: {
    lineHeight: 24,
    fontSize: FontSize.bodyLargeMedium_size,
    top: 20,
    left: 64,
    textAlign: "left",
    fontWeight: 'bold',
    position: "absolute",
  },
  buttonFlexBox: {
    gap: Gap.gap_xs,
    alignItems: "center",
  },
  forgotPasswordChild: {
    top: -432,
    left: -517,
    width: 917,
    height: 899,
    position: "absolute",
  },
  didntReceiveLink: {
    color: Color.neutral60,
    fontFamily: FontFamily.bodyMediumRegular,
    fontSize: 12,
  },
  resendLink: {
    color: Color.otherOrange,
    fontSize: 12,
  },
  didntReceiveLinkContainer: {
    top: 473,
    left: 89,
    fontSize: 12,
    lineHeight: 26,
    textAlign: "center",
    position: "absolute",
  },
  forgotPassword1: {
    fontSize: FontSize.headingH4SemiBold_size,
    letterSpacing: -1,
    lineHeight: 36,
    width: 327,
    color: Color.neutral100,
    fontFamily: FontFamily.headingH4SemiBold,
    fontWeight: "600",
  },
  pleaseSelectOption: {
    width: 327,
    textAlign: "center",
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    color: Color.neutral60,
  },
  sendToYourEmailChild: {
    borderColor: Color.otherOrange,
  },
  checkChild: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    top: "18.75%",
    right: "18.75%",
    bottom: "18.75%",
    left: "18.75%",
  },
  check: {
    marginTop: -16,
    left: 287,
    gap: Gap.gap_sm,
    flexDirection: "row",
    top: "50%",
    position: "absolute",
  },
  sendToYourEmailItem: {
    top: 14,
    left: 18,
    position: "absolute",
  },
  sendToYour: {
    color: Color.neutral100,
    lineHeight: 24,
    fontSize: FontSize.bodyLargeMedium_size,
    top: 20,
    left: 64,
    textAlign: "left",
    fontWeight: 'bold',
    position: "absolute",
  },
  linkResetWill: {
    top: 46,
    width: 201,
    left: 64,
    lineHeight: 20,
    fontSize: FontSize.bodyMediumMedium_size,
    textAlign: "left",
    color: Color.neutral60,
    fontFamily: FontFamily.bodyMediumRegular,
    position: "absolute",
  },
  sendToYourEmail: {
    height: 104,
    width: 335,
  },
  sendToYourPhoneChild: {
    borderColor: "#F5F5F5",
  },
  icon1: {
    top: "0%",
    right: "-62.5%",
    bottom: "37.5%",
    left: "100%",
  },
  sendToYour1: {
    color: Color.neutral100,
  },
  sendToYourEmailParent: {
    gap: Gap.gap_lg,
  },
  list: {
    gap: Gap.gap_4xl,
  },
  icon2: {
    width: 20,
    height: 20,
    display: "none",
    overflow: "hidden",
  },
  button1: {
    color: Color.neutral10,
    fontFamily: FontFamily.headingH4SemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorOrangered,
    justifyContent: "center",
    padding: Padding.p_base,
    flexDirection: "row",
    width: 327,
  },
  forgetPassword: {
    gap: Gap.gap_4xl,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16
  },
  content: {
    marginTop: -145,
    marginLeft: -200,
    left: "50%",
    borderRadius: Border.br_5xl,
    width: 400,
    height: 517,
    backgroundColor: Color.neutral10,
    top: "50%",
    position: "absolute",
    paddingTop: 24,
  },
  forgotPassword: {
    backgroundColor: Color.baseBlack,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
  bottomSection: {
    gap: Gap.gap_sm,
    alignItems: 'center',
    marginTop: -40,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  container: {
    backgroundColor: Color.neutral10,
    width: '90%',
    borderRadius: Border.br_5xl,
    padding: Padding.p_base,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
});

export default ForgetPassword;

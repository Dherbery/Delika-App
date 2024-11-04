import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from '@expo/vector-icons';
import {
  FontFamily,
  FontSize,
  Padding,
  Gap,
  Color,
  Border,
} from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from 'react-native-country-picker-modal'
import OTP from '../components/OTP';

// Create a custom wrapper component to handle defaultProps
const CustomCountryPicker = (props: any) => {
  const defaultProps = {
    withFilter: true,
    withFlag: true,
    withCallingCode: true,
    withAlphaFilter: true,
    renderCountryFilter: () => null,
    // Add any other default props you need
  };

  return <CountryPicker {...defaultProps} {...props} />;
};

const EnterYourPhonenumber = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>('NG')
  const [phoneCode, setPhoneCode] = useState('+234')
  const [country, setCountry] = useState<Country>()
  const [showCountryPicker, setShowCountryPicker] = useState(false)
  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    // Load saved email when component mounts
    const loadSavedPhoneNumber = async () => {
      try {
        const savedPhoneNumber = await AsyncStorage.getItem('userPhoneNumber');
        if (savedPhoneNumber) {
          setPhoneNumber(savedPhoneNumber); 
        }
      } catch (error) {
        console.log('Error loading email:', error);
      }
    };
    loadSavedPhoneNumber();
  }, []);

  // Save email when it changes
  const handlePhoneNumberChange = async (text: string) => {
    setPhoneNumber(text);
    try {
      await AsyncStorage.setItem('userPhoneNumber', text);
    } catch (error) {
      console.log('Error saving phone number:', error);
    }
  };

  const handleSendLink = async () => {
    if (!phoneNumber) {
      alert('Please enter a phone number');
      return;
    }
    
    try {
      const response = await fetch('https://api-server.krontiva.africa/api:uEBBwbSs/reset/user/password/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Show alert and wait for OK press
        Alert.alert(
          'Success',
          'Reset link sent successfully',
          [
            {
              text: 'OK',
              onPress: () => setShowOTP(true)  // Show OTP component when OK is pressed
            }
          ]
        );
      } else {
        alert(data.message || 'Failed to send reset link');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send reset link');
    }
  };

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    setShowCountryPicker(false)
    setPhoneCode(`+${country.callingCode[0]}`)
  }

  const handleVerifyOTP = (code: string) => {
    console.log('Verifying code:', code);
    // Add your verification logic here
  };

  return (
    <View style={styles.enterYourEmail}>
      <View style={styles.content}>
        <View style={styles.enterEmail}>
          <View style={styles.titledescription}>
            <Text style={styles.enterYourEmail1}>Enter your Phone</Text>
            <Text style={[styles.enterYourEmail2, styles.emailTypo]}>
              Enter your phone number address and we'll send you confirmation code to
              reset your password
            </Text>
          </View>
          <View style={styles.inputButton}>
            <View style={styles.inputField}>
              <Text style={[styles.email, styles.emailTypo]}>Phone Number</Text>
              <View style={[styles.input, styles.inputFlexBox]}>
                <View style={[styles.input1, styles.input1FlexBox]}>
                  <TouchableOpacity 
                    style={styles.countryPickerButton} 
                    onPress={() => setShowCountryPicker(true)}
                  >
                    <Text style={[styles.countryCode, styles.emailTypo]}>{phoneCode}</Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color={Color.neutral60} />
                  </TouchableOpacity>
                  
                  <CustomCountryPicker
                    countryCode={countryCode}
                    visible={showCountryPicker}
                    onClose={() => setShowCountryPicker(false)}
                    onSelect={onSelectCountry}
                  />
                  
                  <TextInput
                    style={[styles.enterEmail1, styles.emailTypo]}
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    placeholder="Phone number"
                    placeholderTextColor={Color.neutral60}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.button, styles.input1FlexBox]}
              onPress={handleSendLink}
            >
              <Text style={[styles.button1, styles.topBarTypo]}>Send Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.frame, styles.frameLayout]}>
        <Image
          style={styles.frameLayout}
          contentFit="cover"
          source={require("../assets/images/Frame.png")}
        />
        <View style={styles.topNavigation}>
          <View style={[styles.back, styles.backSpaceBlock]}>
            <MaterialIcons 
              name="arrow-back" 
              size={24} 
              color="#FFFFFF" 
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={[styles.topBar, styles.topBarTypo]}>Enter Phone Number</Text>
          <View style={[styles.menu, styles.backSpaceBlock]}>
            <MaterialIcons 
              name="menu" 
              size={20} 
              color="#000000" 
            />
          </View>
        </View>
      </View>
      <OTP 
        visible={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleVerifyOTP}
        email={phoneNumber}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emailTypo: {
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.bodyMediumMedium_size,
    textAlign: "left",
  },
  inputFlexBox: {
    justifyContent: "center",
    width: 327,
  },
  input1FlexBox: {
    padding: Padding.p_base,
    flexDirection: "row",
    gap: Gap.gap_xs,
    alignItems: "center",
  },
  iconLayout: {
    height: 20,
    width: 20,
    overflow: "hidden",
  },
  topBarTypo: {
    color: Color.neutral10,
    fontWeight: "600",
  },
  frameLayout: {
    height: 899,
    width: 1409,
    overflow: "hidden",
  },
  backSpaceBlock: {
    padding: Padding.p_base,
    flexDirection: "row",
  },
  enterYourEmail1: {
    fontSize: FontSize.headingH4SemiBold_size,
    letterSpacing: -1,
    lineHeight: 36,
    width: 327,
    textAlign: "left",
    color: Color.neutral100,
    fontWeight: "700",
  },
  enterYourEmail2: {
    color: Color.neutral60,
    width: 327,
  },
  titledescription: {
    gap: Gap.gap_xs,
    alignItems: "center",
  },
  email: {
    alignSelf: "stretch",
    color: Color.neutral100,
  },
  enterEmail1: {
    color: Color.neutral100,
    flex: 1,
  },
  input1: {
    borderRadius: 178,
    borderColor: Color.neutral60,
    borderWidth: 1,
    borderStyle: "solid",
    alignSelf: "stretch",
    backgroundColor: Color.neutral10,
    padding: Padding.p_base,
  },
  input: {
    borderRadius: 138,
    overflow: "hidden",
  },
  inputField: {
    gap: Gap.gap_xs,
  },
  icon1: {
    display: "none",
  },
  button1: {
    textAlign: "center",
    lineHeight: 20,
    fontSize: FontSize.bodyMediumMedium_size,
    color: Color.neutral10,
    fontWeight: "700",
  },
  button: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorOrangered,
    justifyContent: "center",
    width: 327,
  },
  inputButton: {
    gap: Gap.gap_4xl,
  },
  enterEmail: {
    gap: 24,
  },
  content: {
    marginTop: 39,
    marginLeft: -225,
    top: "50%",
    left: "50%",
    borderRadius: Border.br_5xl,
    width: 450,
    height: 400,
    paddingVertical: 24,
    paddingHorizontal: 0,
    alignItems: "center",
    backgroundColor: Color.neutral10,
    position: "absolute",
  },
  back: {
    padding: Padding.p_base,
    flexDirection: "row",
  },
  topBar: {
    fontSize: FontSize.bodyLargeMedium_size,
    lineHeight: 24,
    textAlign: "left",
    fontWeight: "700",
    color: Color.neutral10,
  },
  menu: {
    borderRadius: Border.br_5xl,
    width: 36,
    height: 36,
  },
  topNavigation: {
    justifyContent: "space-between",
    paddingVertical: 12,
    marginTop: -200,
    flexDirection: "row",
    width: 327,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  frame: {
    top: -780,
    left: -521,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    height: 899,
    width: 1409,
  },
  enterYourEmail: {
    backgroundColor: Color.baseBlack,
    width: "100%",
    height: 812,
    overflow: "hidden",
    flex: 1,
  },
  countryCode: {
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.bodyMediumMedium_size,
    textAlign: "left",
    width: 60, // Add appropriate width for country code
  },
  countryPickerButton: {
    flexDirection: 'row',
  },
});

export default EnterYourPhonenumber;

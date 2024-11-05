import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { Image } from "expo-image";
import { useFonts } from 'expo-font';
import EmailInput from "../components/componentEmail";
import PasswordInput from "../components/componentsPasswordInput";
import Button1 from "../components/Button1";
import { Color, FontFamily, FontSize, Gap, Border } from "../GlobalStyles";
import { useState } from "react";
import Content from "../components/Content";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Failed from "../components/failed";

// Define your navigation param list type
type RootStackParamList = {
  SignInEmpty: undefined;
  ForgetPassword: { animation?: string };
  Home: undefined;
  // ... other screens
};

const SignInEmpty = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [authToken, setAuthToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  // 1. Font loading
  const [fontsLoaded] = useFonts({
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    // Add other required fonts
  });

  // 2. Handlers
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setShowFailedModal(true);
        return;
      }

      // First API call - Login
      const loginResponse = await fetch('https://api-server.krontiva.africa/api:uEBBwbSs/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const loginData = await loginResponse.json();
      
      if (!loginResponse.ok) {
        setShowFailedModal(true);
        return;
      }

      // Store auth token
      await AsyncStorage.setItem('authToken', loginData.authToken);
      setAuthToken(loginData.authToken);

      // Second API call - Get user data
      const userResponse = await fetch('https://api-server.krontiva.africa/api:uEBBwbSs/auth/me', {
        headers: {
          'Authorization': `Bearer ${loginData.authToken}`
        }
      });

      if (!userResponse.ok) {
        setShowFailedModal(true);
        return;
      }

      const userData = await userResponse.json();
      
      // Store all user data
      const userDataToStore = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        restaurantId: userData.restaurantId,
        branchId: userData.branchId,
        created_at: userData.created_at
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userDataToStore));
      
      // Update state with user data
      setUserData(userData);
      setUserId(userData.id);
      setCreatedAt(userData.created_at);
      setRestaurantId(userData.restaurantId);
      setBranchId(userData.branchId);
      setUserEmail(userData.email);
      setUserRole(userData.role);

      setShowModal(true);
      
      // Navigate to Home after successful login
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);

    } catch (err) {
      console.error('Login error:', err);
      setShowFailedModal(true);
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword", {
      animation: 'slide_from_bottom'
    });
  };

  // 3. Loading check
  if (!fontsLoaded) {
    return null; // or <LoadingScreen />
  }

  // 4. Main render
  return (
    <View style={styles.signInEmpty}>
      {/* Background Image */}
      <Image
        style={styles.signInEmptyChild}
        contentFit="cover"
        source={require("../assets/group-770754.png")}
      />

      {/* Main Content */}
      <View style={[styles.content, styles.contentBg]}>
        {/* Title Section */}
        <View style={styles.titledescription}>
          <Text style={styles.signInNow}>Sign In now.</Text>
          <Text style={styles.pleaseSignIn}>Please sign in to your account</Text>
        </View>

        {/* Form Fields */}
        <View style={[styles.formContainer]}>

  
          {/* Input Fields */}
          <View style={styles.inputsContainer}>
            <EmailInput
              placeholder="Enter email"
              icon="Left"
              state="Filled"
              type="Left"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={{ height: 5 }} />
            
            <PasswordInput 
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
            />
           
          {/* Login Button */}
          <View style={styles.buttonWrapper}>
            <Button1 
              type="Label & Icon" 
              button="Login" 
              onPress={handleLogin}
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleForgetPassword}>
              <Text style={styles.forgetPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
       

        {/* Logo/Image */}
        <Image
          style={styles.e698e4ef0cd1c7a4b29a995ef9a073Icon}
          contentFit="cover"
          source={require("../assets/06e698e4ef0cd1c7a4b29a995ef9a073-1.png")}
        />
      </View>

      {/* Status Bar */}
      <View style={[styles.other, styles.otherLayout]}>
        <View style={[styles.iphoneXstatusBarsstatusBa, styles.otherLayout]}>
          <View style={styles.rectangle} />
          <View style={styles.battery}>
            <View style={styles.border} />
            <Image
              style={styles.capIcon}
              contentFit="cover"
              source={require("../assets/cap.png")}
            />
            <View style={[styles.capacity, styles.contentBg]} />
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
          <View style={[styles.timeStyle, styles.timeLayout]}>
            <Text style={[styles.time, styles.timeLayout]}>9:41</Text>
          </View>
        </View>
      </View>

      {/* Success Modal */}
      {showModal && (
        <Content 
          visible={showModal}
          onClose={() => setShowModal(false)}
          userData={userData}
        />
      )}

      {/* Failed Modal */}
      {showFailedModal && (
        <Failed 
          visible={showFailedModal}
          onClose={() => setShowFailedModal(false)}
          userData={userData}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentBg: {
    backgroundColor: Color.neutral10,
    position: "absolute",
  },
  timeTypo: {
    textAlign: "center",
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumSemiBold_size,
  },
  otherLayout: {
    height: 44,
    width: 375,
    position: "absolute",
  },
  timeLayout: {
    width: 54,
    position: "absolute",
  },
  signInEmptyChild: {
    top: -432,
    left: -517,
    width: 917,
    height: 899,
    position: "absolute",
  },
  signInNow: {
    fontSize: FontSize.headingH4SemiBold_size,
    letterSpacing: -1,
    lineHeight: 36,
    fontWeight: "600",
    fontFamily: FontFamily.bodyMediumSemiBold,
    color: Color.neutral100,
    width: 327,
    textAlign: "left",
  },
  pleaseSignIn: {
    color: Color.neutral100,
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumSemiBold_size,
    lineHeight: 20,
    width: 327,
    textAlign: "left",
  },
  titledescription: {
    top: 100,
    alignItems: "center",
    gap: Gap.gap_md,
    left: 16,
    position: "absolute",
  },
  forgetPassword: {
    color: Color.colorOrangered,
    textAlign: "left",
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumSemiBold_size,
    marginTop: -150,
  },
  e698e4ef0cd1c7a4b29a995ef9a073Icon: {
    top: -155,
    left: 42,
    width: 275,
    height: 258,
    position: "absolute",
  },
  content: {
    marginTop: -158,
    marginLeft: -179.5,
    borderRadius: Border.br_11xl,
    width: 359,
    height: 532,
    left: "50%",
    top: "50%",
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
    width: 18,
    height: 7,
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
    letterSpacing: 0,
    lineHeight: 20,
    color: Color.neutral10,
    textAlign: "center",
    fontFamily: FontFamily.bodyMediumMedium,
    fontWeight: "500",
    fontSize: FontSize.bodyMediumSemiBold_size,
    top: "50%",
    width: 54,
  },
  timeStyle: {
    top: 12,
    left: 21,
    height: 20,
  },
  iphoneXstatusBarsstatusBa: {
    marginTop: -22,
    marginLeft: -187.5,
    left: "50%",
    top: "50%",
    overflow: "hidden",
  },
  other: {
    left: 0,
    display: "none",
    top: 0,
  },
  signInEmpty: {
    backgroundColor: Color.baseBlack,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,  // Adjust this value to move up/down
    left: 16,
    right: 16,
  },
  inputsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,  // Increased from 2 to 20 for more spacing between inputs
  },
  formContainer: {
    position: 'absolute',
    top: 200,
    left: 16,
    right: 16,
    gap: 40,  // Increased gap between inputs and button
  },
  buttonWrapper: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorModalContent: {
    backgroundColor: Color.neutral10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    color: Color.baseBlack,
    fontSize: FontSize.bodyMediumSemiBold_size,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: Color.colorOrangered,
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: "#FFFFFF",
    fontSize: FontSize.bodyMediumSemiBold_size,
  },
});

export default SignInEmpty;

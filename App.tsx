import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ForgetPassword from './app/ForgetPassword'
import SignInEmpty from './app/SignInEmpty';
import OTP from './components/OTP';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';
import EnterYourPhonenumber from './app/EnterYourPhonenumber';
import NewPassword from './app/NewPassword';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Support for defaultProps will be removed from function components']);


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Define the type before creating the navigator
export type RootStackParamList = {
  SignInEmpty: undefined;
  ForgetPassword: undefined;
  EnterYourPhonenumber: undefined;
  NewPassword: undefined;
  Home: undefined;
  OTP: {
    phoneNumber: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    // Add any other fonts you're using
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SignInEmpty" component={SignInEmpty} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="EnterYourPhonenumber" component={EnterYourPhonenumber} />
          <Stack.Screen 
            name="OTP" 
            component={(props: NativeStackScreenProps<RootStackParamList, 'OTP'>) => (
              <OTP 
                {...props.route.params}
                visible={true}
                onClose={() => {}}
                onVerify={() => {}}
                email=""
              />
            )}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="NewPassword" component={NewPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
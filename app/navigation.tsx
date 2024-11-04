import React from 'react';
import { NavigationContainer, useNavigation, NavigationProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import SplashModal from '../components/componentsSplashModal';
import Onboarding1 from '../app/Onboarding1'; // if it's relative to current directory
import SignInEmpty from '../app/SignInEmpty';

export type RootStackParamList = {
  Onboarding: undefined;
  Onboarding1: undefined;
  SignInEmpty: undefined;  // Add this line
  ForgetPassword: undefined;
};

const Stack = createStackNavigator();

function SplashScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <SplashModal 
      visible={isVisible}
      onClose={handleClose}
      onNavigate={() => navigation.navigate('Onboarding1')}
      onNextPress={() => navigation.navigate('Onboarding1')}
    />
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashModal" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="SignInEmpty" component={SignInEmpty} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
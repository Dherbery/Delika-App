import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { View } from 'react-native';
import { router } from 'expo-router';


export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'InterMedium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
        router.replace("/Onboarding");
      }, 2000);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // or a loading component
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}

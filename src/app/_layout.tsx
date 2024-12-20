import FontAwesome from '@expo/vector-icons/FontAwesome';

import '@/global.css';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '../contexts/authContext';
import { StatusBar } from 'expo-status-bar';
import { BottomTabContextProvider } from '../contexts/bottomTabContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  require('../configs/reactotron.config.js');
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode="dark">
        <StatusBar style="light" />

        <AuthProvider>
          <BottomTabContextProvider>
            <RootLayoutComponent />
          </BottomTabContextProvider>
        </AuthProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutComponent() {
  return (
    <GluestackUIProvider mode="dark">
      <Slot />
    </GluestackUIProvider>
  );
}

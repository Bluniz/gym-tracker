/* eslint-disable @typescript-eslint/no-floating-promises */
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaView } from 'react-native';
import { AuthProvider } from './src/contexts/auth';
import { Routes } from './src/routes';
import { StatusBar } from 'expo-status-bar';
import './src/configs/firebase';
import 'react-native-gesture-handler';
import { Theme } from './src/styles/theme';




export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
          <StatusBar backgroundColor={Theme.colors.gray500} style='light'/>
        </SafeAreaView>
      </AuthProvider>
    </NavigationContainer>
  );
}

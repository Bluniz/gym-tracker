import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaView } from 'react-native';
import { AuthProvider } from './src/contexts/auth';
import { Routes } from './src/routes';
import { StatusBar } from 'expo-status-bar';
import './src/configs/firebase';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
          <StatusBar />
        </SafeAreaView>
      </AuthProvider>
    </NavigationContainer>
  );
}

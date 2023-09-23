import { NavigationContainer } from '@react-navigation/native';
import { View, SafeAreaView } from 'react-native';
import { Routes } from './src/routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Routes />
        <StatusBar />
      </SafeAreaView>
    </NavigationContainer>
  );
}

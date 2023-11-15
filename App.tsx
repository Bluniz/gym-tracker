/* eslint-disable @typescript-eslint/no-floating-promises */
import {NavigationContainer} from '@react-navigation/native';

import {Platform, SafeAreaView} from 'react-native';
import {AuthProvider} from './src/contexts/auth';
import {Routes} from './src/routes';
import {StatusBar} from 'expo-status-bar';
import './src/configs/firebase';
import 'react-native-gesture-handler';
import {currentTheme} from './src/styles/theme';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView style={{flex: 1}}>
          <Routes />
          <StatusBar
            backgroundColor={currentTheme.colors.background}
            style={Platform.select({
              ios: 'dark',
              android: 'light',
            })}
          />
        </SafeAreaView>
      </AuthProvider>
    </NavigationContainer>
  );
}

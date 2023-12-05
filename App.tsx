/* eslint-disable @typescript-eslint/no-floating-promises */
import {NavigationContainer} from '@react-navigation/native';

import {Platform, SafeAreaView} from 'react-native';
import {AuthProvider} from './src/contexts/auth';
import {Routes} from './src/routes';
import {StatusBar} from 'expo-status-bar';

import {currentTheme} from './src/styles/theme';

import './src/configs/firebase';
import 'react-native-gesture-handler';

if (__DEV__) {
  // require('./src/configs/ReactotronConfig');
  import('./src/configs/ReactotronConfig').then(() => console.log('Reactotron Configured'));

}

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
              android: 'dark',
            })}
          />
        </SafeAreaView>
      </AuthProvider>
    </NavigationContainer>
  );
}

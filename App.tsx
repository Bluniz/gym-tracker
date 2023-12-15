/* eslint-disable @typescript-eslint/no-floating-promises */
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';

import {Platform, SafeAreaView} from 'react-native';
import {AuthProvider} from './src/contexts/auth';
import {Routes} from './src/routes';
import {StatusBar} from 'expo-status-bar';

import {currentTheme} from './src/styles/theme';

import {FullLoading} from './src/components';
import {useStore} from './src/stores';

import './src/configs/firebase';
import 'react-native-gesture-handler';

if (__DEV__) {
  require('./src/configs/ReactotronConfig');
  //import('./src/configs/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  const isLoadingGlobal = useStore(state => state.isLoading);

  return (
    <RootSiblingParent>
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
      {isLoadingGlobal && <FullLoading />}
    </RootSiblingParent>
  );
}

/* eslint-disable @typescript-eslint/no-floating-promises */
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';

import {SafeAreaView, View} from 'react-native';
import {Routes} from './src/routes';
import {StatusBar} from 'expo-status-bar';

import {currentTheme} from './src/styles/theme';

import {FullLoading} from './src/components';
import {useStore} from './src/stores';

import './src/configs/firebase';
import 'react-native-gesture-handler';
import {AuthContainer} from './src/components/AuthContainer';
import {SheetProvider} from 'react-native-actions-sheet';
import './src/configs/sheets';

import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback} from 'react';

SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  require('./src/configs/ReactotronConfig');
  //import('./src/configs/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  const isLoadingGlobal = useStore(state => state.isLoading);

  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{flex: 1}}>
      <RootSiblingParent>
        <SheetProvider>
          <NavigationContainer>
            <AuthContainer>
              <SafeAreaView style={{flex: 1}}>
                <Routes />
                <StatusBar
                  backgroundColor={currentTheme.colors.background}
                  translucent
                />
              </SafeAreaView>
            </AuthContainer>
          </NavigationContainer>
        </SheetProvider>
        {isLoadingGlobal && <FullLoading />}
      </RootSiblingParent>
    </View>
  );
}

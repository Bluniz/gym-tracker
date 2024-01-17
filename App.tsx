/* eslint-disable @typescript-eslint/no-floating-promises */
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';

import {SafeAreaView} from 'react-native';
import {Routes} from './src/routes';
import {StatusBar} from 'expo-status-bar';

import {currentTheme} from './src/styles/theme';

import {FullLoading} from './src/components';
import {useStore} from './src/stores';

import './src/configs/firebase';
import 'react-native-gesture-handler';
import {AuthContainer} from './src/components/AuthContainer';

if (__DEV__) {
  require('./src/configs/ReactotronConfig');
  //import('./src/configs/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  const isLoadingGlobal = useStore(state => state.isLoading);

  return (
    <RootSiblingParent>
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
      {isLoadingGlobal && <FullLoading />}
    </RootSiblingParent>
  );
}

import { Box } from '../components/ui/box';
import { Heading } from '../components/ui/heading';

import Constants from 'expo-constants';

import { Image } from '../components/ui/image';
import { Center } from '../components/ui/center';
import { VStack } from '../components/ui/vstack';
import { useAuth } from '../contexts/authContext';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AppState } from 'react-native';
import { supabaseClient } from '../services/supabase';
import { Spinner } from '../components/ui/spinner';
import colors from 'tailwindcss/colors';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabaseClient.auth.startAutoRefresh();
  } else {
    supabaseClient.auth.stopAutoRefresh();
  }
});

export default function Index() {
  const { signIn, isLoading } = useAuth();

  if (isLoading)
    return (
      <Center className="h-full w-full flex-1 bg-slate-800">
        <Spinner size="large" color={colors.red[700]} />
      </Center>
    );

  return (
    <Box className="h-full flex-1 bg-slate-800" style={{ paddingTop: Constants.statusBarHeight }}>
      <Center className="flex-1">
        <VStack className="gap-10">
          <VStack className="items-center gap-4">
            <Image source={require('../assets/Logo.png')} alt="Gym Tracker Logo" size="2xl" />
            <Heading size="xl" className="text-white">
              Gym Tracker
            </Heading>
          </VStack>

          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            style={{
              borderRadius: 16,
            }}
            onPress={() => {
              signIn();
            }}
          />
        </VStack>
      </Center>
    </Box>
  );
}

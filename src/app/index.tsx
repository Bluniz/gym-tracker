import { Box } from '../components/ui/box';
import { Heading } from '../components/ui/heading';
import { Text } from '../components/ui/text';

import Constants from 'expo-constants';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { Button, ButtonText } from '../components/ui/button';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Image } from '../components/ui/image';
import { Center } from '../components/ui/center';
import { VStack } from '../components/ui/vstack';

GoogleSignin.configure({
  webClientId: '175722923818-518j5jehh35e688b205r37r3e87q3ir0.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const response = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(response!.data!.idToken);

  return auth().signInWithCredential(googleCredential);
};

export default function Index() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setUser(userState);
    });
  }, []);

  return (
    <Box className="h-full flex-1 bg-slate-800" style={{ paddingTop: Constants.statusBarHeight }}>
      <Center className="flex-1">
        <VStack>
          <VStack className="items-center gap-4">
            <Image source={require('../assets/Logo.png')} alt="Gym Tracker Logo" size="2xl" />
            <Heading size="xl" className="text-white">
              Gym Tracker
            </Heading>
          </VStack>

          <Heading className="text-red-700">{user?.email || 'Please login'}</Heading>
          <Text className="text-red-600">Texto</Text>

          {!user && (
            <Button onPress={onGoogleButtonPress}>
              <ButtonText>Login</ButtonText>
            </Button>
          )}
        </VStack>
      </Center>
    </Box>
  );
}

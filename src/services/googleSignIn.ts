import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { supabaseClient } from './supabase';

export const onSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const hasPreviousLogin = await GoogleSignin.hasPreviousSignIn();

    const response = hasPreviousLogin
      ? await GoogleSignin.signInSilently()
      : await GoogleSignin.signIn();

    if (response.data?.idToken) {
      const { data } = await supabaseClient.auth.signInWithIdToken({
        provider: 'google',
        token: response.data?.idToken,
      });

      return data;
    } else {
      throw new Error('no ID token present!');
    }
  } catch (error: any) {
    console.log('error', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }

    Alert.alert('Google Login Error', error.message);
    throw new Error('no ID token present!');
  }
};

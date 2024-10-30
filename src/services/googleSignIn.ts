import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

export const onSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const hasPreviousLogin = await GoogleSignin.hasPreviousSignIn();

    const response = hasPreviousLogin
      ? await GoogleSignin.signInSilently()
      : await GoogleSignin.signIn();

    console.log('response', response);

    if (!response.data) throw new Error(JSON.stringify(response, null, 2));

    const googleCredential = auth.GoogleAuthProvider.credential(response!.data!.idToken);

    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.log('error', error);
    Alert.alert('Google Login Error', error.message);
  }
};

export const onSignOut = async () => {
  return await auth().signOut();
};

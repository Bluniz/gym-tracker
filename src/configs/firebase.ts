import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {storage} from "../services/storage"

import * as firebaseAuth from 'firebase/auth';
// Your secondary Firebase project credentials for Android...
const androidCredentials = {
  clientId:
    '175722923818-518j5jehh35e688b205r37r3e87q3ir0.apps.googleusercontent.com',
  appId: '1:175722923818:android:6f9072d8e82f3c28458053',
  apiKey: 'AIzaSyCPbeEJsFBSASXqwQ5kMrV_cL3wFooORuA',
  databaseURL: 'gs://gym-tracker-e6904.appspot.com',
  storageBucket: 'gym-tracker-e6904.appspot.com',
  messagingSenderId: '',
  projectId: 'gym-tracker-e6904',
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId:
    '175722923818-fl6fm9tn815n95g94hi05kh22fr6nn8d.apps.googleusercontent.com',
  appId: '1:175722923818:ios:71fe71b1f716eda3458053',
  apiKey: 'AIzaSyBecK4vFamcl51gppq8qLIev62GVjRKylc',
  databaseURL: 'gs://gym-tracker-e6904.appspot.com',
  storageBucket: 'gym-tracker-e6904.appspot.com',
  messagingSenderId: '',
  projectId: 'gym-tracker-e6904',
};

// Select the relevant credentials
const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});

const config = {
  name: 'gym-tracker',
};

export const app = initializeApp(credentials!, config);

export const database = getFirestore(app);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

export const auth = firebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

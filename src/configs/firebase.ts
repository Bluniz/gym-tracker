import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';


import * as firebaseAuth from 'firebase/auth';
// Your secondary Firebase project credentials for Android...
const androidCredentials = {
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID_ANDROID,
  appId: process.env.EXPO_PUBLIC_APP_ID_ANDROID,
  apiKey: process.env.EXPO_PUBLIC_API_KEY_ANDROID,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SEND_ID || '',
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId: process.env.EXPO_PUBLIC_CLIENT_ID_IOS,
  appId: process.env.EXPO_PUBLIC_APP_ID_IOS,
  apiKey: process.env.EXPO_PUBLIC_API_KEY_IOS,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SEND_ID || '',
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
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

export const auth = firebaseAuth.initializeAuth(app);

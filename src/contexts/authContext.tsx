import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as GoogleService from '@/src/services/googleSignIn';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '175722923818-518j5jehh35e688b205r37r3e87q3ir0.apps.googleusercontent.com',
  offlineAccess: true,
});
interface IAuthContext {
  signIn: () => void;
  signOut: () => void;
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  signIn: () => null,
  signOut: () => null,
  user: null,
  isLoading: false,
} as IAuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = () => {
    setIsLoading(true);
    GoogleService.onSignIn();
  };
  const signOut = () => {
    setIsLoading(true);
    GoogleService.onSignOut();
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      console.log('hello', userState);
      setUser(userState);

      if (userState) router.replace('/');

      setIsLoading(false);
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

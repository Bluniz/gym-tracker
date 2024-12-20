import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as GoogleService from '@/src/services/googleSignIn';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabaseClient } from '../services/supabase';
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_ID,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

interface IAuthContext {
  signIn: () => void;
  signOut: () => void;
  session: Session | null;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
} as IAuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async () => {
    setIsLoading(true);
    const data = await GoogleService.onSignIn();
    setSession(data.session);
    router.replace('/(app)/training');
    setIsLoading(false);
  };
  const signOut = async () => {
    setIsLoading(true);
    await supabaseClient.auth.signOut();
    setIsLoading(false);
  };

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      console.log('session', session);
      if (session) {
        setSession(session);
        router.replace('/(app)/training');
      }
      setIsLoading(false);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

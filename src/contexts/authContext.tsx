import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import * as GoogleService from '@/src/services/googleSignIn';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabaseClient } from '../services/supabase';
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';

GoogleSignin.configure({
  webClientId: '175722923818-518j5jehh35e688b205r37r3e87q3ir0.apps.googleusercontent.com',
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
    router.replace('/');
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
        router.replace('/');
      }
      setIsLoading(false);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        router.replace('/');
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

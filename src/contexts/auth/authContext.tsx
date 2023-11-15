import React, {createContext, useState, useLayoutEffect} from 'react';
import {
  createUser as createRegister,
  logIn,
  logOut,
  parseErrors,
  getCurrentUser,
} from '../../services/users';
import {AuthContextProps, AuthProviderProps, User} from './authContext.types';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../configs/firebase';
export const authContext = createContext<AuthContextProps>({});

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const currentUser = getCurrentUser();

        if (currentUser) {
          setUser({
            name: currentUser.displayName,
            email: currentUser.email,
          });
          navigation.navigate('app' as never);
        }
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      setIsLoading(false);
    };
  }, [navigation]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await logIn(email, password);
      setUser(userData);
      setError(null);
      navigation.navigate('app' as never);
    } catch (error) {
      console.log(error);

      setError(parseErrors(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      setIsLoading(true);

      const userData = await createRegister(email, password, displayName);
      setUser(userData);
    } catch (error) {
      setError(parseErrors(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await logOut();
      setUser(null);
      navigation.navigate('signIn' as never);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <authContext.Provider
      value={{
        user,
        signIn,
        signOut,
        createUser,
        isLoading,
        error,
        clearError,
      }}>
      {children}
    </authContext.Provider>
  );
};

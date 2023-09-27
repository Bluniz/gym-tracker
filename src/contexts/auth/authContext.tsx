import React, { createContext, useState } from 'react';
import {
  createUser as createRegister,
  logIn,
  logOut,
} from '../../services/users';
import { AuthContextProps, AuthProviderProps, User } from './authContext.types';

export const authContext = createContext<AuthContextProps>({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await logIn(email, password);
      setUser(userData);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await logOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{ user, signIn, signOut, createUser, isLoading }}
    >
      {children}
    </authContext.Provider>
  );
};

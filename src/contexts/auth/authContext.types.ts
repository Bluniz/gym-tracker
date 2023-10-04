import { ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
}

export interface AuthContextProps {
  user?: User;
  signIn?: (email: string, password: string) => void;
  createUser?: (email: string, password: string, displayName: string) => void;
  signOut?: () => void;
  isLoading?: boolean;
  error?: string;
  clearError?: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

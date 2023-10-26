import { ReactNode } from 'react';

export interface User {
  name: string | null;
  email: string | null;
}

export interface AuthContextProps {
  user?: User | null;
  signIn?: (email: string, password: string) => void;
  createUser?: (email: string, password: string, displayName: string) => void;
  signOut?: () => void;
  isLoading?: boolean;
  error?: string | null;
  clearError?: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

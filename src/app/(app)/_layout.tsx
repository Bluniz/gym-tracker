import { useAuth } from '@/src/contexts/authContext';
import { Redirect, Slot } from 'expo-router';
import React from 'react';
import { Loading } from '@/src/components/Loading';

export default function AppLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) return <Loading className="flex-1 bg-slate-800" />;

  if (!session) {
    return <Redirect href="/signIn" />;
  }

  return <Slot />;
}

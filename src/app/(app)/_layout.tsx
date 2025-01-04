import { Center } from '@/src/components/ui/center';
import { useAuth } from '@/src/contexts/authContext';
import { Redirect, Slot, Tabs } from 'expo-router';
import { BottomTabBar } from '@/src/components/BottomTabBar';
import { Dumbbell, Home } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import colors from 'tailwindcss/colors';
import { Spinner } from '@/src/components/ui/spinner';

export default function AppLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading)
    return (
      <Center className="h-full w-full flex-1 bg-slate-800">
        <Spinner size="large" color={colors.red[700]} />
      </Center>
    );

  if (!session) {
    return <Redirect href="/signIn" />;
  }

  return <Slot />;
}

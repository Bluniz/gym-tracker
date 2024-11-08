import { Text } from '@/src/components/ui/text';
import { Center } from '@/src/components/ui/center';
import { useAuth } from '@/src/contexts/authContext';
import { Redirect, Tabs } from 'expo-router';
import { BottomTabBar } from '@/src/components/BottomTabBar';
import { Dumbbell, Home } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Box } from '@/src/components/ui/box';
import colors from 'tailwindcss/colors';

export default function AppLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading)
    return (
      <Center className="h-full w-full flex-1">
        <Text>Carregando...</Text>
      </Center>
    );

  if (!session) {
    return <Redirect href="/signIn" />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
        sceneContainerStyle={{
          backgroundColor: colors.slate['800'],
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: Home,
            tabBarLabel: 'Home',
          }}
        />
        <Tabs.Screen
          name="exercises"
          options={{
            tabBarLabel: 'Exercises',
            tabBarIcon: Dumbbell,
          }}
        />
      </Tabs>
    </>
  );
}

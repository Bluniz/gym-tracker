import { Stack } from 'expo-router';
import colors from 'tailwindcss/colors';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.slate['800'],
        },
      }}
    />
  );
}

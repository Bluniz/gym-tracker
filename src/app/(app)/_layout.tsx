import { Text } from '@/src/components/Themed';
import { Center } from '@/src/components/ui/center';
import { useAuth } from '@/src/contexts/authContext';
import { Redirect, Stack } from 'expo-router';

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

  return <Stack />;
}

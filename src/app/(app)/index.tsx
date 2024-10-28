import { Button, ButtonText } from '@/src/components/ui/button';
import { Center } from '@/src/components/ui/center';
import { Heading } from '@/src/components/ui/heading';
import { useAuth } from '@/src/contexts/authContext';

export default function Home() {
  const { signOut } = useAuth();
  return (
    <Center className="h-full w-full flex-1">
      <Heading>Logado</Heading>
      <Button onPress={signOut}>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Center>
  );
}

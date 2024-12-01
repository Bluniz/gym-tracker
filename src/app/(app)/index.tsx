import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Center } from '@/src/components/ui/center';
import { Heading } from '@/src/components/ui/heading';
import { useAuth } from '@/src/contexts/authContext';

export default function Home() {
  const { signOut } = useAuth();
  return (
    <Container animate>
      <ScreenHeader
        title="Treinos"
        description="O que vamos treinar hoje?"
        canGoBack={false}
        containerClassname="pt-2"
      />
      <Center className="h-full">
        <Heading>Logado</Heading>
        <Button onPress={signOut}>
          <ButtonText>Sair</ButtonText>
        </Button>
      </Center>
    </Container>
  );
}

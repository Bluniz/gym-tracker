import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { Text } from '@/src/components/ui/text';

export default function CreateTrainingScreen() {
  return (
    <Container animate>
      <ScreenHeader title="Criar Treino" />
      <Text>Criar</Text>
    </Container>
  );
}

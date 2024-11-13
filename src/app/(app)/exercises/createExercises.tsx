import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { Box } from '@/src/components/ui/box';
import { Button, ButtonIcon } from '@/src/components/ui/button';
import { Heading } from '@/src/components/ui/heading';
import { HStack } from '@/src/components/ui/hstack';
import { Text } from '@/src/components/ui/text';
import { router } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';

export default function CreateExerciseScreen() {
  return (
    <Container>
      <ScreenHeader title="Criar exercicios" />
    </Container>
  );
}

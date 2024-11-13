import { Box } from '@/src/components/ui/box';
import { Button, ButtonIcon } from '@/src/components/ui/button';
import { Heading } from '@/src/components/ui/heading';
import { HStack } from '@/src/components/ui/hstack';
import { Text } from '@/src/components/ui/text';
import { router } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import { Show } from './Show';

interface ScreenHeaderProps {
  title: string;
  canGoBack?: boolean;
}

export function ScreenHeader({ title, canGoBack = true }: ScreenHeaderProps) {
  return (
    <HStack className="items-center justify-between px-4">
      <Show when={canGoBack}>
        <Button variant="link" onPress={() => router.back()} size="xl">
          <ButtonIcon as={MoveLeft} size="xl" />
        </Button>
      </Show>

      <Heading className="mx-auto">{title}</Heading>
    </HStack>
  );
}

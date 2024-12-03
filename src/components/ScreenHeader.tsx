import { Button, ButtonIcon } from '@/src/components/ui/button';
import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';
import { HStack } from '@/src/components/ui/hstack';
import { router } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import { Show } from './Show';
import { VStack } from './ui/vstack';
import clsx from 'clsx';
import { Box } from './ui/box';

interface ScreenHeaderProps {
  title: string;
  description?: string;
  canGoBack?: boolean;
  containerClassname?: string;
}

export function ScreenHeader({
  title,
  canGoBack = true,
  description,
  containerClassname,
}: ScreenHeaderProps) {
  return (
    <HStack className={clsx('items-center justify-between px-5', containerClassname)}>
      <Show when={canGoBack}>
        <Button variant="link" onPress={() => router.back()} size="xl">
          <ButtonIcon as={MoveLeft} size="xl" />
        </Button>
      </Show>

      <VStack className="mx-auto w-full items-center">
        <Heading>{title}</Heading>
        {description && <Text>{description}</Text>}
      </VStack>
    </HStack>
  );
}

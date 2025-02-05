import { Tables } from '@/database.types';
import { Card } from '@/src/components/ui/card';
import { Heading } from '@/src/components/ui/heading';
import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
import { Text } from '@/src/components/ui/text';
import { PencilLine, Trash2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { OptionsMenu, OptionsMenuItem } from '@/src/components/OptionsMenu';
import { useMemo } from 'react';

interface ExerciseItemProps {
  exercise: Tables<'exercises'>;
  onDelete: () => void;
}

export const ExerciseItem = ({ exercise, onDelete }: ExerciseItemProps) => {
  const menuItems = useMemo<OptionsMenuItem[]>(
    () => [
      {
        key: 'Editar',
        name: 'Editar',
        icon: PencilLine,
        action: () =>
          router.navigate({
            pathname: '/exercises/editExercise',
            params: {
              id: exercise.id,
            },
          }),
      },
      {
        key: 'Apagar',
        name: 'Apagar',
        icon: Trash2,
        action: onDelete,
      },
    ],
    [exercise.id, onDelete],
  );
  return (
    <Card key={exercise.id} className="h-20 justify-between bg-slate-700" size="md">
      <HStack className="items-center justify-between">
        <VStack>
          <Heading size="md">{exercise.name}</Heading>
          <Text>{exercise?.description || '---'}</Text>
        </VStack>
        <OptionsMenu items={menuItems} />
      </HStack>
    </Card>
  );
};

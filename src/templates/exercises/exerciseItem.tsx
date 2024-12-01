import { Tables } from '@/database.types';
import { Card } from '@/src/components/ui/card';
import { Heading } from '@/src/components/ui/heading';
import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
import { Text } from '@/src/components/ui/text';
import { Menu, MenuItem, MenuItemLabel } from '@/src/components/ui/menu';
import { Button, ButtonIcon } from '@/src/components/ui/button';
import { EllipsisVertical, PencilLine, Trash2 } from 'lucide-react-native';
import { Icon } from '@/src/components/ui/icon';

interface ExerciseItemProps {
  exercise: Tables<'exercises'>;
  onDelete: () => void;
}

export const ExerciseItem = ({ exercise, onDelete }: ExerciseItemProps) => {
  return (
    <Card key={exercise.id} className="h-20 justify-between bg-slate-700" size="md">
      <HStack className="items-center justify-between">
        <VStack>
          <Heading size="md">{exercise.name}</Heading>
          <Text>{exercise?.description || '---'}</Text>
        </VStack>
        <Menu
          offset={5}
          className="bg-gray-800"
          trigger={({ ...trigerProps }) => {
            return (
              <Button {...trigerProps} variant="link">
                <ButtonIcon as={EllipsisVertical} />
              </Button>
            );
          }}
        >
          <MenuItem key="Editar" textValue="Editar">
            <Icon as={PencilLine} size="sm" className="mr-2" />
            <MenuItemLabel size="sm">Editar</MenuItemLabel>
          </MenuItem>
          <MenuItem key="Apagar" textValue="Apagar" onPress={onDelete}>
            <Icon as={Trash2} size="sm" className="mr-2 text-red-700" />
            <MenuItemLabel size="sm">Apagar</MenuItemLabel>
          </MenuItem>
        </Menu>
      </HStack>
    </Card>
  );
};

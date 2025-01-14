import { Button, ButtonIcon } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/src/components/ui/checkbox';
import { HStack } from '@/src/components/ui/hstack';
import { Input, InputField } from '@/src/components/ui/input';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import { CheckIcon, Minus, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { SelectedExercisesProps } from './types';

interface ExerciseItemProps {
  name: string;
  id: string;
  initialSeries?: string;
  initialReps?: string;

  onSelect: (exercise: SelectedExercisesProps) => void;
  onUpdate: (exercise: SelectedExercisesProps) => void;
}

export const ExerciseItem = ({
  name,
  onSelect,
  onUpdate,
  id,
  initialReps = '0',
  initialSeries = '0',
}: ExerciseItemProps) => {
  const [series, setSeries] = useState(initialSeries);
  const [reps, setReps] = useState(initialReps);

  const exercise = { name, id, series, reps };

  const handleUpSeries = () =>
    setSeries((prevState) => {
      const newValue = String(Number(prevState) + 1);
      onUpdate({ ...exercise, series: newValue });
      return newValue;
    });
  const handleDownSeries = () =>
    setSeries((prevState) => {
      const newValue = String(Number(prevState) - 1);
      onUpdate({ ...exercise, series: newValue });
      return newValue;
    });

  const handleUpReps = () =>
    setReps((prevState) => {
      const newValue = String(Number(prevState) + 1);
      onUpdate({ ...exercise, reps: newValue });
      return newValue;
    });
  const handleDownReps = () =>
    setReps((prevState) => {
      const newValue = String(Number(prevState) - 1);
      onUpdate({ ...exercise, reps: newValue });
      return newValue;
    });

  return (
    <Checkbox value={id} onChange={() => onSelect(exercise)}>
      <Card variant="elevated" className="w-full rounded-xl bg-gray-700">
        <HStack className="items-center gap-2">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} className="text-red-700" size="lg" />
          </CheckboxIndicator>
          <CheckboxLabel className="text-bold text-lg text-white">{name}</CheckboxLabel>
        </HStack>
        <VStack space="sm" className="pt-4">
          <HStack space="sm" className="items-center">
            <Text className="flex-1 font-bold">Series</Text>
            <Button
              variant="solid"
              className="w-8 disabled:opacity-55"
              onPress={handleDownSeries}
              disabled={series === '0'}
            >
              <ButtonIcon as={Minus} />
            </Button>
            <Input variant="outline" isReadOnly className="w-10">
              <InputField value={series} />
            </Input>
            <Button variant="solid" className="size-2" onPress={handleUpSeries}>
              <ButtonIcon as={Plus} className="h-4 w-4" />
            </Button>
          </HStack>
          <HStack space="sm" className="items-center">
            <Text className="flex-1 font-bold">Repetições</Text>
            <Button
              variant="solid"
              className="w-8 disabled:opacity-55"
              onPress={handleDownReps}
              disabled={reps === '0'}
            >
              <ButtonIcon as={Minus} />
            </Button>
            <Input variant="outline" isReadOnly className="w-10">
              <InputField value={reps} />
            </Input>
            <Button variant="solid" className="size-2" onPress={handleUpReps}>
              <ButtonIcon as={Plus} className="h-4 w-4" />
            </Button>
          </HStack>
        </VStack>
      </Card>
    </Checkbox>
  );
};

import { Tables } from '@/database.types';
import { Card } from '@/src/components/ui/card';
import { Heading } from '@/src/components/ui/heading';
import { VStack } from '@/src/components/ui/vstack';
import { Text } from '@/src/components/ui/text';
import { Center } from '@/src/components/ui/center';

interface ExerciseList {
  data: Tables<'exercises'>[];
}

export const ExerciseList = ({ data }: ExerciseList) => {
  if (data.length === 0) {
    return (
      <Center className="h-full">
        <Heading>Você não possui treinos criados no momento.</Heading>
      </Center>
    );
  }

  return (
    <VStack className="px-4 py-6" space="md">
      {data.map((exercise) => {
        return (
          <Card key={exercise.id} className="h-20 justify-center bg-slate-700" size="md">
            <Heading size="md">{exercise.name}</Heading>
            {exercise?.description && <Text>{exercise?.description}</Text>}
          </Card>
        );
      })}
    </VStack>
  );
};

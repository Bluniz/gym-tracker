import React from 'react';
import { Box } from '@/src/components/ui/box';
import { Heading } from '@/src/components/ui/heading';
import { useAuth } from '@/src/contexts/authContext';
import { getExercises } from '@/src/services/exercises';
import { ExerciseError } from './exerciseError';
import { ExerciseList } from './exerciseList';
import { router } from 'expo-router';
import { Fab, FabIcon } from '@/src/components/ui/fab';
import { Plus } from 'lucide-react-native';
import { Container } from '@/src/components/Container';
import { Loading } from '@/src/components/Loading';
import { useQuery } from '@tanstack/react-query';

export default function ExercisesTemplate() {
  const { session } = useAuth();

  const { data, isLoading, refetch, isRefetching, isError, status } = useQuery({
    queryKey: ['exercises', session?.user?.id!],
    queryFn: () => getExercises(session?.user?.id!),
  });

  console.log({ isLoading, isRefetching, status });

  return (
    <Container animate className="h-full max-h-[88%] w-full flex-1">
      <Heading className="pt-8 text-center text-white">Exercises</Heading>

      {isLoading ? (
        <Loading className="flex-1" />
      ) : (
        <Box>
          {isError ? (
            <ExerciseError />
          ) : (
            <ExerciseList
              data={data?.data || []}
              refetchList={refetch}
              isRefetching={isRefetching}
            />
          )}
        </Box>
      )}
      <Fab
        size="lg"
        placement="bottom right"
        className="bg-red-700 active:bg-red-500"
        onPress={() => router.navigate('/(app)/exercises/createExercises')}
      >
        <FabIcon as={Plus} className="text-white" />
      </Fab>
    </Container>
  );
}

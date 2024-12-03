import React from 'react';
import { Tables } from '@/database.types';
import { Box } from '@/src/components/ui/box';
import { Heading } from '@/src/components/ui/heading';
import { useAuth } from '@/src/contexts/authContext';
import { getExercises } from '@/src/services/exercises';
import Constants from 'expo-constants';
import { useCallback, useState } from 'react';
import { ExerciseError } from './exerciseError';
import { ExerciseLoading } from './exerciseLoading';
import { VStack } from '@/src/components/ui/vstack';
import { Card } from '@/src/components/ui/card';
import { ExerciseList } from './exerciseList';
import { router, useFocusEffect } from 'expo-router';
import { Fab, FabIcon, FabLabel } from '@/src/components/ui/fab';
import { Plus } from 'lucide-react-native';
import { Container } from '@/src/components/Container';

export default function ExercisesTemplate() {
  const [exercises, setExercises] = useState<Tables<'exercises'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { session } = useAuth();

  const fetchExercises = useCallback(async () => {
    try {
      setHasError(false);
      setIsLoading(true);
      const { data } = await getExercises(session?.user.id!);
      setExercises(data || []);
    } catch (error) {
      setHasError(true);
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  useFocusEffect(
    useCallback(() => {
      const fetchExercisess = async () => {
        await fetchExercises();
      };
      fetchExercisess();
    }, [fetchExercises]),
  );

  return (
    <Container animate className="h-full max-h-[88%] w-full flex-1">
      <Heading className="pt-8 text-center text-white">Exercises</Heading>

      {isLoading ? (
        <ExerciseLoading />
      ) : (
        <Box>
          {hasError ? (
            <ExerciseError />
          ) : (
            <ExerciseList data={exercises} refetchList={fetchExercises} />
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

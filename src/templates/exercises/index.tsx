import { Tables } from '@/database.types';
import { Box } from '@/src/components/ui/box';
import { Center } from '@/src/components/ui/center';
import { Heading } from '@/src/components/ui/heading';
import { Spinner } from '@/src/components/ui/spinner';
import { Text } from '@/src/components/ui/text';
import { useAuth } from '@/src/contexts/authContext';
import { getExercises } from '@/src/services/exercises';
import Constants from 'expo-constants';
import { useCallback, useEffect, useState } from 'react';
import colors from 'tailwindcss/colors';
import { ExerciseError } from './exerciseError';
import { ExerciseLoading } from './exerciseLoading';
import { VStack } from '@/src/components/ui/vstack';
import { Card } from '@/src/components/ui/card';
import { ExerciseList } from './exerciseList';
import { useFocusEffect } from 'expo-router';

export default function ExercisesTemplate() {
  const [exercises, setExercises] = useState<Tables<'exercises'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { session } = useAuth();
  useFocusEffect(
    useCallback(() => {
      (async () => {
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
      })();
    }, []),
  );

  return (
    <Box
      className="h-full w-full flex-1 bg-slate-800"
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      <Heading className="pt-8 text-center text-white">Exercises</Heading>

      {isLoading ? (
        <ExerciseLoading />
      ) : (
        <Box>{hasError ? <ExerciseError /> : <ExerciseList data={exercises} />}</Box>
      )}
    </Box>
  );
}

import { Container } from '@/src/components/Container';
import { CustomInput } from '@/src/components/CustomInput';
import { ScreenHeader } from '@/src/components/ScreenHeader';

import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { useCustomToast } from '@/src/hooks/toast';
import { Box } from '@/src/components/ui/box';

import { FlatList } from 'react-native';
import { HStack } from '@/src/components/ui/hstack';
import { ExerciseModal } from '../components/exerciseModal';
import { KeyboardView } from '@/src/components/KeyboardView';
import { SelectedExercisesProps } from '../types';
import {
  getTrainingDetails,
  getTrainingExercises,
  updateExerciseTraining,
  updateTraining,
} from '@/src/services/training';
import { CustomButton } from '@/src/components/CustomButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useHideBottomTab } from '@/src/hooks/useHideBottomTab';
import { Loading } from '@/src/components/Loading';
import { queryClient } from '@/src/configs/queryClient';

interface EditTrainingTemplateProps {
  id: string;
}

export const EditTrainingTemplate = ({ id }: EditTrainingTemplateProps) => {
  const [name, setName] = useState('');
  const [observation, setObservations] = useState('');
  const [openExerciseSheet, setOpenExerciseSheet] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercisesProps[]>([]);

  const [trainingHasEditted, setTrainingHasEditted] = useState(false);
  const [exerciseTrainingHasEditted, setExerciseTrainingHasEditted] = useState(false);

  const { showNewToast } = useCustomToast();

  const {
    data: detailsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['training-detail', id],
    queryFn: () => getTrainingDetails(id),
  });

  const {
    data: exercisesResponse,
    isLoading: exercisesLoading,
    error: exerciseError,
  } = useQuery({
    queryKey: ['training-exercises', id],
    queryFn: () => getTrainingExercises(id),
  });

  const updateTrainingMutation = useMutation({
    mutationFn: updateTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['training-detail', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['trainings'],
      });
    },
  });

  const updateExerciseTrainingMutation = useMutation({
    mutationFn: updateExerciseTraining,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['training-exercises', id],
      }),
  });

  useHideBottomTab();
  useEffect(() => {
    if (detailsResponse?.data && !error && !name) {
      setName(detailsResponse?.data?.name);
      setObservations(detailsResponse?.data?.observation || '');
    }

    if (exercisesResponse?.data && !exerciseError && !selectedExercises.length) {
      const data = exercisesResponse?.data?.map(({ exercises, id, reps, series, ...rest }) => ({
        ...rest,
        id: String(exercises?.id),
        name: exercises?.name,
        reps: reps || 0,
        series: series || '0',
      }));
      setSelectedExercises(data as SelectedExercisesProps[]);
    }

    if (error || exerciseError) {
      showNewToast('Ocorreu um erro inesperado ao buscar os dados do treino');
      router.navigate('/(app)/(tabs)/training');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsResponse, error, exerciseError]);

  const isConfirmButtonDisabled = !name || !selectedExercises.length;

  const handleUpdateTraining = async () => {
    try {
      if (trainingHasEditted) {
        await updateTrainingMutation.mutateAsync({
          id,
          name,
          observation,
        });
      }

      if (exerciseTrainingHasEditted) {
        await updateExerciseTrainingMutation.mutateAsync({
          selectedExercises,
          trainingId: id,
        });
      }

      showNewToast('Treino atualizado com sucesso!');
      router.push(`/(app)/(tabs)/training/${id}`);
    } catch (error) {
      showNewToast('Ocorreu um erro inesperado ao atualizar o treino');
      console.log('error', error);
    }
  };

  const isLoadingState = isLoading || exercisesLoading;

  return (
    <Container animate className="relative flex h-full flex-col">
      {isLoadingState ? (
        <Loading />
      ) : (
        <KeyboardView>
          <ScreenHeader title="Editar Treino" />
          <VStack className="mt-4 flex-1 justify-between px-4">
            <VStack space="md">
              <Heading>Informações gerais</Heading>

              <CustomInput
                label="Nome"
                value={name}
                onChangeText={(value) => {
                  setTrainingHasEditted(true);
                  setName(value);
                }}
              />
              <CustomInput
                label="Observações"
                className="max-h-5 overflow-hidden"
                value={observation}
                onChangeText={(value) => {
                  setTrainingHasEditted(true);
                  setObservations(value);
                }}
              />

              <Heading>Exercicios</Heading>
              <CustomButton
                text="Adicionar exercicio"
                variant="outline"
                onPress={() => setOpenExerciseSheet(true)}
              />

              <FlatList
                data={selectedExercises}
                keyExtractor={(item) => item.id}
                contentContainerClassName="gap-2 mt-2"
                renderItem={({ item }) => (
                  <HStack className="ml-2 items-center" space="md">
                    <Box className="h-3 w-3 rounded-full bg-red-700" />
                    <Text className="text-lg">{item.name}</Text>
                    <Text className="text-lg">Repetições: {item.reps}</Text>
                    <Text className="text-lg">Series: {item.series}</Text>
                  </HStack>
                )}
              />
            </VStack>

            <CustomButton
              text="Atualizar"
              action="primary"
              className="mb-10"
              disabled={isConfirmButtonDisabled}
              onPress={handleUpdateTraining}
            />
          </VStack>

          <ExerciseModal
            isOpen={openExerciseSheet}
            handleClose={() => setOpenExerciseSheet(false)}
            selectedExercises={selectedExercises}
            setSelectedExercises={(data) => {
              setExerciseTrainingHasEditted(true);
              setSelectedExercises(data);
            }}
          />
        </KeyboardView>
      )}
    </Container>
  );
};

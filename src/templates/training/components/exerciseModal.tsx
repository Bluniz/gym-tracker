import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/src/components/ui/modal';
import { CloseIcon, Icon } from '@/src/components/ui/icon';
import { Text } from '@/src/components/ui/text';
import { FlatList } from 'react-native';
import { CheckboxGroup } from '@/src/components/ui/checkbox';
import { Dispatch, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ExerciseItem } from './exerciseItem';
import { SelectedExercisesProps } from '../types';
import { Loading } from '@/src/components/Loading';
import { CustomButton } from '@/src/components/CustomButton';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/src/contexts/authContext';
import { getExercises } from '@/src/services/exercises';

interface ExerciseModalProps {
  isOpen: boolean;
  handleClose: () => void;
  setSelectedExercises: Dispatch<React.SetStateAction<SelectedExercisesProps[]>>;
  selectedExercises: SelectedExercisesProps[];
}

export function ExerciseModal({
  isOpen,
  handleClose,
  selectedExercises,
  setSelectedExercises,
}: ExerciseModalProps) {
  const { session } = useAuth();

  const { data: response, isLoading } = useQuery({
    queryKey: ['exercises', session?.user?.id!],
    queryFn: () => getExercises(session?.user?.id!),
  });

  const [localSelectedExercises, setLocalSelectedExercises] =
    useState<SelectedExercisesProps[]>(selectedExercises);
  const parsedSelectedExercises = localSelectedExercises.map((item) => item.id.toString());

  const handleSelectExercise = (exercise: SelectedExercisesProps) => {
    const index = localSelectedExercises.findIndex(
      (item) => String(item.id) === String(exercise.id),
    );
    if (index === -1) {
      setLocalSelectedExercises((prevState) => [...prevState, exercise]);
    } else {
      setLocalSelectedExercises((prevState) =>
        prevState.filter((item) => String(item.id) !== String(exercise.id)),
      );
    }
  };

  const handleUpdateSelectedExercise = (exercise: SelectedExercisesProps) => {
    const index = localSelectedExercises.findIndex(
      (item) => String(item.id) === String(exercise.id),
    );

    if (index === -1) {
      return;
    } else {
      const copy = [...localSelectedExercises];
      copy[index] = exercise;
      setLocalSelectedExercises(copy);
    }
  };

  const handleSave = () => {
    setSelectedExercises(localSelectedExercises);
    handleClose();
  };

  const getInitialRepsOrSeriesFromSelectedExercises = (id: string) => {
    const exercise = localSelectedExercises.find((item) => {
      return item.id.toString() === id;
    });

    if (exercise) {
      return {
        reps: exercise.reps,
        series: exercise.series,
      };
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLocalSelectedExercises(selectedExercises);
    }
  }, [isOpen, selectedExercises]);

  return (
    <Modal isOpen={isOpen} className="justify-end">
      <ModalBackdrop />
      <ModalContent className="h-3/4 w-full rounded-t-2xl bg-gray-800">
        <ModalHeader className="justify-end">
          <ModalCloseButton onPress={handleClose}>
            <Icon as={CloseIcon} size="lg" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody scrollEnabled={false}>
          {isLoading ? (
            <Loading className="flex min-h-full" />
          ) : (
            <CheckboxGroup value={parsedSelectedExercises}>
              <FlatList
                data={response?.data}
                keyExtractor={(data) => String(data.id)}
                contentContainerClassName="gap-4"
                ListHeaderComponent={
                  <Text className="mb-4 bg-gray-800 pb-1 text-lg">Selecione os exercicios:</Text>
                }
                stickyHeaderIndices={[0]}
                renderItem={({ item }) => {
                  const initialValues = getInitialRepsOrSeriesFromSelectedExercises(
                    item.id.toString(),
                  );
                  return (
                    <ExerciseItem
                      name={item.name}
                      id={item.id.toString()}
                      key={item.id}
                      onSelect={handleSelectExercise}
                      onUpdate={handleUpdateSelectedExercise}
                      initialReps={initialValues?.reps}
                      initialSeries={initialValues?.series}
                    />
                  );
                }}
                ListEmptyComponent={
                  <>
                    <Text>Nenhum exercicio cadastrado. Por favor, crie alguns</Text>
                    <CustomButton
                      text="Criar exercicio"
                      action="primary"
                      textClassName="font-bold"
                      onPress={() => router.navigate('/(app)/(tabs)/exercises')}
                    />
                  </>
                }
              />
            </CheckboxGroup>
          )}
        </ModalBody>
        <ModalFooter className="pb-2">
          <CustomButton
            action="secondary"
            text="Fechar"
            className="flex-1"
            size="xl"
            onPress={handleClose}
          />
          <CustomButton
            action="primary"
            text="Salvar"
            className="flex-1"
            size="xl"
            onPress={handleSave}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import { Tables } from '@/database.types';
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
import { ScrollView } from 'react-native';
import { VStack } from '@/src/components/ui/vstack';
import { CheckboxGroup } from '@/src/components/ui/checkbox';
import { Dispatch, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ExerciseItem } from './exerciseItem';
import { SelectedExercisesProps } from '../types';
import { Loading } from '@/src/components/Loading';
import { CustomButton } from '@/src/components/CustomButton';

interface ExerciseModalProps {
  isOpen: boolean;
  handleClose: () => void;
  exercises: Tables<'exercises'>[];
  setSelectedExercises: Dispatch<React.SetStateAction<SelectedExercisesProps[]>>;
  selectedExercises: SelectedExercisesProps[];
  isLoadingExercises: boolean;
}

export function ExerciseModal({
  isOpen,
  handleClose,
  exercises,
  selectedExercises,
  isLoadingExercises,
  setSelectedExercises,
}: ExerciseModalProps) {
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
        <ModalBody>
          {isLoadingExercises ? (
            <Loading className="flex min-h-full" />
          ) : (
            <CheckboxGroup value={parsedSelectedExercises}>
              <Text className="mb-4 text-lg">Selecione os exercicios:</Text>
              <ScrollView className="h-full">
                <VStack space="md">
                  {!exercises?.length && (
                    <>
                      <Text>Nenhum exercicio cadastrado. Por favor, crie alguns</Text>
                      <CustomButton
                        text="Criar exercicio"
                        action="primary"
                        textClassName="font-bold"
                        onPress={() => router.navigate('/(app)/(tabs)/exercises')}
                      />
                    </>
                  )}
                  {exercises.map((item) => {
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
                  })}
                </VStack>
              </ScrollView>
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

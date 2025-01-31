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
import { Button, ButtonText } from '@/src/components/ui/button';
import { Dispatch, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ExerciseItem } from './exerciseItem';
import { SelectedExercisesProps } from './types';
import { Loading } from '@/src/components/Loading';

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
    const index = localSelectedExercises.findIndex((item) => item.id === exercise.id);

    if (index === -1) {
      setLocalSelectedExercises((prevState) => [...prevState, exercise]);
    } else {
      setLocalSelectedExercises((prevState) => prevState.filter((item) => item.id !== exercise.id));
    }
  };

  const handleUpdateSelectedExercise = (exercise: SelectedExercisesProps) => {
    const index = localSelectedExercises.findIndex((item) => item.id === exercise.id);

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
    const exercise = localSelectedExercises.find((item) => item.id === id);

    if (exercise) {
      return {
        reps: exercise.reps,
        series: exercise.series,
      };
    }
  };

  useEffect(() => {
    if (isOpen) setLocalSelectedExercises(selectedExercises);
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
                      <Button
                        className="rounded-xl bg-red-700"
                        onPress={() => router.navigate('/(app)/(tabs)/exercises')}
                      >
                        <ButtonText className="text-center font-bold text-white">
                          Criar exercicios
                        </ButtonText>
                      </Button>
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
          <Button className="flex-1 rounded-xl" size="xl" onPress={handleClose}>
            <ButtonText className="text-black">Fechar</ButtonText>
          </Button>
          <Button className="flex-1 rounded-xl bg-red-700" size="xl" onPress={handleSave}>
            <ButtonText className="text-white">Salvar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

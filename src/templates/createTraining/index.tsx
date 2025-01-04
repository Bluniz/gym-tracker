import { Container } from '@/src/components/Container';
import { CustomInput } from '@/src/components/CustomInput';
import { ScreenHeader } from '@/src/components/ScreenHeader';

import { Button, ButtonText } from '@/src/components/ui/button';
import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useBottomTab } from '@/src/contexts/bottomTabContext';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/src/components/ui/modal';
import { CheckIcon, CloseIcon, Icon } from '@/src/components/ui/icon';
import { useAuth } from '@/src/contexts/authContext';
import { Tables } from '@/database.types';
import { getExercises } from '@/src/services/exercises';
import { useCustomToast } from '@/src/hooks/toast';
import { Center } from '@/src/components/ui/center';
import { Spinner } from '@/src/components/ui/spinner';
import colors from 'tailwindcss/colors';
import { Box } from '@/src/components/ui/box';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/src/components/ui/checkbox';
import { FlatList, ScrollView } from 'react-native';
import { Card } from '@/src/components/ui/card';
import { HStack } from '@/src/components/ui/hstack';
import { ExerciseModal } from './exerciseModal';
import { KeyboardView } from '@/src/components/KeyboardView';

export const CreateTrainingTemplate = () => {
  const [name, setName] = useState('');
  const [observations, setObservations] = useState('');
  const [openExerciseSheet, setOpenExerciseSheet] = useState(false);
  const [isLoadingExercises, setIsLoadingExercises] = useState(true);
  const [exercises, setExercises] = useState<Tables<'exercises'>[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const { session } = useAuth();
  const { isOpen, closeBottomTab, openBottomTab } = useBottomTab();
  const { showNewToast } = useCustomToast();

  const isConfirmButtonDisabled = !name || !selectedExercises.length;

  const fetchExercises = useCallback(async () => {
    try {
      setIsLoadingExercises(true);
      const { data } = await getExercises(session?.user.id!);
      setExercises(data || []);
    } catch (error) {
      showNewToast('Ocorreu um erro inesperado ao buscar os dados dos exercícios');
      console.log('error', error);
    } finally {
      setIsLoadingExercises(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  useFocusEffect(
    useCallback(() => {
      if (isOpen) {
        closeBottomTab();
      }
      return () => {
        openBottomTab();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return (
    <Container animate className="relative flex h-full flex-col">
      <KeyboardView>
        <ScreenHeader title="Criar Treino" />
        <VStack className="mt-4 flex-1 justify-between px-4">
          <VStack space="md">
            <Heading>Informações gerais</Heading>

            <CustomInput label="Nome" value={name} onChangeText={setName} />
            <CustomInput
              label="Observações"
              className="max-h-5 overflow-hidden"
              value={observations}
              onChangeText={setObservations}
            />

            <Heading>Exercicios</Heading>
            <Button
              variant="outline"
              className="rounded-xl"
              onPress={() => setOpenExerciseSheet(true)}
            >
              <ButtonText>Adicionar exercicio</ButtonText>
            </Button>
            <FlatList
              data={selectedExercises}
              keyExtractor={(item) => item}
              contentContainerClassName="gap-2 mt-2"
              renderItem={({ item }) => (
                <HStack className="ml-2 items-center" space="md">
                  <Box className="h-3 w-3 rounded-full bg-red-700" />
                  <Text className="text-lg">{item}</Text>
                </HStack>
              )}
            />
          </VStack>

          <Button
            className="mb-10 rounded-xl bg-red-700 disabled:opacity-50"
            size="xl"
            disabled={isConfirmButtonDisabled}
          >
            <ButtonText className="text-white">Criar</ButtonText>
          </Button>
        </VStack>

        <ExerciseModal
          isOpen={openExerciseSheet}
          handleClose={() => setOpenExerciseSheet(false)}
          exercises={exercises}
          selectedExercises={selectedExercises}
          isLoadingExercises={isLoadingExercises}
          setSelectedExercises={setSelectedExercises}
        />
      </KeyboardView>
    </Container>
  );
};

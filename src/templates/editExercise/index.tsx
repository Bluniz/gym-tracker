import { Tables } from '@/database.types';
import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';

import { Button, ButtonText } from '@/src/components/ui/button';

import { VStack } from '@/src/components/ui/vstack';
import { getExerciseById, getExerciseTypes, updateExercise } from '@/src/services/exercises';
import { router, useFocusEffect } from 'expo-router';
import React, { useRef } from 'react';
import { useCallback, useState } from 'react';
import { TypesField } from '../createExercises/typesField';
import { ConfirmAlert } from '@/src/components/ConfirmAlert';
import { useAuth } from '@/src/contexts/authContext';
import { useCustomToast } from '@/src/hooks/toast';
import { CustomInput } from '@/src/components/CustomInput';
import { Center } from '@/src/components/ui/center';
import { Heading } from '@/src/components/ui/heading';
import colors from 'tailwindcss/colors';
import { Spinner } from '@/src/components/ui/spinner';

interface EditExerciseTemplateProps {
  id: string;
}

export function EditExerciseTemplate({ id }: EditExerciseTemplateProps) {
  const [types, setTypes] = useState<Tables<'exercises_types'>[] | null>([]);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [hasErrorOnScreen, setHasErrorOnScreen] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exercisePhotoUrl, setExercisePhotoUrl] = useState('');

  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const { session } = useAuth();
  const { showNewToast } = useCustomToast();

  const descriptionRef = useRef(null);
  const urlPhotoRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getExerciseTypes();
          setTypes(response.data);

          const exerciseResponse = await getExerciseById(id, session?.user.id!);
          setExerciseName(exerciseResponse.data?.name || '');
          setExerciseDescription(exerciseResponse.data?.description || '');
          setExercisePhotoUrl(exerciseResponse.data?.photo_url || '');

          setSelectedTypes(exerciseResponse.data?.exercise_type || []);
        } catch (error) {
          console.log(error);
          setHasErrorOnScreen(true);
        } finally {
          setIsLoadingScreen(false);
        }
      })();
    }, [id, session?.user?.id]),
  );

  const onConfirm = async () => {
    try {
      await updateExercise({
        id,
        exercise_type: selectedTypes,
        name: exerciseName,
        user_id: session?.user.id!,
        photo_url: exercisePhotoUrl,
        description: exerciseDescription,
      });
      showNewToast('Exercicio atualizado com sucesso!');

      router.navigate('/(app)/exercises');
    } catch (error: any) {
      console.log('deu erro tio', error);
      setShowConfirmAlert(false);
      showNewToast(error?.message || 'Ocorreu um erro inesperado!');
    }
  };

  if (isLoadingScreen) {
    return (
      <Container className="h-full" animate>
        <Center className="h-full">
          <Spinner size="large" color={colors.red[700]} />
        </Center>
      </Container>
    );
  }

  return (
    <Container className="flex h-full flex-col" animate>
      <ScreenHeader title="Editar exercicio" />

      {hasErrorOnScreen ? (
        <Center className="h-full">
          <Heading size="xl">Ocorreu um erro inesperado...</Heading>
        </Center>
      ) : (
        <>
          <VStack className="flex-1 justify-between px-5 pt-6">
            <VStack space="xl">
              <CustomInput
                label="Nome*"
                placeholder="Digite o nome do exercicio"
                value={exerciseName}
                onChangeText={setExerciseName}
                returnKeyType="next"
                onSubmitEditing={() => descriptionRef?.current?.focus()}
              />
              <CustomInput
                label="Descrição"
                ref={descriptionRef}
                placeholder="Digite a descrição do seu exercicio"
                value={exerciseDescription}
                onChangeText={setExerciseDescription}
                returnKeyType="next"
                onSubmitEditing={() => urlPhotoRef?.current?.focus()}
                maxLength={30}
                className="max-h-5 overflow-hidden"
              />
              <CustomInput
                label="Foto"
                placeholder="Adicione a URL da foto do exercicio"
                value={exercisePhotoUrl}
                onChangeText={setExercisePhotoUrl}
                returnKeyType="next"
                className="max-h-5"
              />

              <TypesField
                types={types}
                setSelectedTypes={setSelectedTypes}
                selectedTypes={selectedTypes}
                isLoading={false}
                hasError={false}
              />
            </VStack>
            <Button
              className="mb-10 w-full rounded-xl bg-red-700 disabled:opacity-75"
              size="xl"
              onPress={() => setShowConfirmAlert(true)}
              disabled={!exerciseName || !selectedTypes.length}
            >
              <ButtonText className="text-white">Atualizar</ButtonText>
            </Button>
          </VStack>

          <ConfirmAlert
            title="Tem certeza que deseja criar este treino?"
            onClose={() => setShowConfirmAlert(false)}
            isOpen={showConfirmAlert}
            onConfirm={onConfirm}
            confirmText="Atualizar"
            cancelText="Cancelar"
          />
        </>
      )}
    </Container>
  );
}

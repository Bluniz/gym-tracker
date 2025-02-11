import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';

import { VStack } from '@/src/components/ui/vstack';
import { getExerciseById, updateExercise } from '@/src/services/exercises';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { TypesField } from '../components/typesField';
import { ConfirmAlert } from '@/src/components/ConfirmAlert';
import { useAuth } from '@/src/contexts/authContext';
import { useCustomToast } from '@/src/hooks/toast';
import { CustomInput } from '@/src/components/CustomInput';
import { Center } from '@/src/components/ui/center';
import { Heading } from '@/src/components/ui/heading';
import { Loading } from '@/src/components/Loading';
import { CustomButton } from '@/src/components/CustomButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useHideBottomTab } from '@/src/hooks/useHideBottomTab';
import { queryClient } from '@/src/configs/queryClient';

interface EditExerciseTemplateProps {
  id: string;
}

export function EditExerciseTemplate({ id }: EditExerciseTemplateProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exercisePhotoUrl, setExercisePhotoUrl] = useState('');

  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const { session } = useAuth();
  const { showNewToast } = useCustomToast();

  const descriptionRef = useRef(null);
  const urlPhotoRef = useRef(null);

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['exercise', id, session?.user.id!],
    queryFn: () => getExerciseById(id, session?.user.id!),
  });

  const updateMutation = useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      showNewToast('Exercicio atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push('/(app)/exercises');
    },
    onError: (error) => {
      console.log('deu erro', error);
      showNewToast(error?.message || 'Ocorreu um erro inesperado!');
    },
    onSettled: () => {
      setShowConfirmAlert(false);
    },
  });

  useHideBottomTab();

  const onConfirm = async () => {
    await updateMutation.mutateAsync({
      id,
      exercise_type: selectedTypes,
      name: exerciseName,
      user_id: session?.user.id!,
      photo_url: exercisePhotoUrl,
      description: exerciseDescription,
    });
  };

  useEffect(() => {
    if (response?.data && !exerciseName) {
      setExerciseName(response?.data?.name || '');
      setExerciseDescription(response?.data?.description || '');
      setExercisePhotoUrl(response?.data?.photo_url || '');
      setSelectedTypes(response?.data?.exercise_type || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.data]);

  if (isLoading) {
    return (
      <Container className="h-full" animate>
        <Loading />
      </Container>
    );
  }

  return (
    <Container className="flex h-full flex-col" animate>
      <ScreenHeader title="Editar exercicio" />

      {error ? (
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

              <TypesField setSelectedTypes={setSelectedTypes} selectedTypes={selectedTypes} />
            </VStack>
            <CustomButton
              size="xl"
              className="mb-10 w-full"
              action="primary"
              text="Atualizar"
              disabled={!exerciseName || !selectedTypes.length}
              onPress={() => setShowConfirmAlert(true)}
            />
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

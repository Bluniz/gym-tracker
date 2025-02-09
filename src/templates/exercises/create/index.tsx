import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';

import { VStack } from '@/src/components/ui/vstack';
import { createExercise } from '@/src/services/exercises';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import { useState } from 'react';
import { TypesField } from '../components/typesField';
import { ConfirmAlert } from '@/src/components/ConfirmAlert';
import { useAuth } from '@/src/contexts/authContext';
import { useCustomToast } from '@/src/hooks/toast';
import { CustomInput } from '@/src/components/CustomInput';
import { KeyboardView } from '@/src/components/KeyboardView';
import { Keyboard } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { CreateExerciseInput } from '@/src/services/types';
import { queryClient } from '@/src/configs/queryClient';
import { useHideBottomTab } from '@/src/hooks/useHideBottomTab';
import { CustomButton } from '@/src/components/CustomButton';

export function CreateExerciseTemplate() {
  const mutation = useMutation({
    mutationFn: (exerciseData: CreateExerciseInput) => createExercise(exerciseData),
    onSuccess: () => {
      showNewToast('Exercicio criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.navigate('/(app)/exercises');
    },
    onError: (error) => {
      showNewToast(error?.message || 'Ocorreu um erro inesperado!');
      setShowConfirmAlert(false);
    },
  });

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exercisePhotoUrl, setExercisePhotoUrl] = useState('');

  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const { session } = useAuth();
  const { showNewToast } = useCustomToast();

  const descriptionRef = useRef(null);
  const urlPhotoRef = useRef(null);

  useHideBottomTab();

  return (
    <Container className="flex h-full flex-col" animate>
      <KeyboardView>
        <ScreenHeader title="Criar exercicios" />

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
            text="Criar"
            onPress={() => {
              Keyboard.dismiss();
              setShowConfirmAlert(true);
            }}
            action="primary"
            size="xl"
            disabled={!exerciseName || !selectedTypes.length}
            className="mb-10"
          />
        </VStack>
        <ConfirmAlert
          title="Tem certeza que deseja criar este treino?"
          onClose={() => setShowConfirmAlert(false)}
          isOpen={showConfirmAlert}
          onConfirm={() =>
            mutation.mutate({
              exercise_type: selectedTypes,
              name: exerciseName,
              user_id: session?.user.id!,
              photo_url: exercisePhotoUrl,
              description: exerciseDescription,
            })
          }
          confirmText="Criar"
          cancelText="Cancelar"
        />
      </KeyboardView>
    </Container>
  );
}

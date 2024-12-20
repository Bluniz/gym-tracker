import { Container } from '@/src/components/Container';
import { CustomInput } from '@/src/components/CustomInput';
import { ScreenHeader } from '@/src/components/ScreenHeader';

import { Button, ButtonText } from '@/src/components/ui/button';
import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import { useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { Box } from '@/src/components/ui/box';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from 'expo-router';
import { useBottomTab } from '@/src/contexts/bottomTabContext';

export const CreateTrainingTemplate = () => {
  const [name, setName] = useState('');
  const [observations, setObservations] = useState('');
  const [openExerciseSheet, setOpenExerciseSheet] = useState(false);

  const { isOpen, closeBottomTab, openBottomTab } = useBottomTab();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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

  return (
    <Container animate className="relative h-full">
      <ScreenHeader title="Criar Treino" />
      <VStack className="mt-4 px-4" space="md">
        <Heading>Informações gerais</Heading>

        <CustomInput label="Nome" value={name} onChangeText={setName} />
        <CustomInput
          label="Observações"
          className="max-h-5 overflow-hidden"
          value={observations}
          onChangeText={setObservations}
        />

        <Heading>Exercicios</Heading>
        <Button variant="outline" className="rounded-xl" onPress={() => setOpenExerciseSheet(true)}>
          <ButtonText>Adicionar exercicio</ButtonText>
        </Button>
      </VStack>

      <Box className="flex-1 border">
        {openExerciseSheet && (
          <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges}>
            <BottomSheetView style={{ flex: 1, borderWidth: 1 }}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

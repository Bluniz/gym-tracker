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
import { CheckIcon, CloseIcon, Icon } from '@/src/components/ui/icon';
import { Center } from '@/src/components/ui/center';
import { Spinner } from '@/src/components/ui/spinner';
import colors from 'tailwindcss/colors';
import { Text } from '@/src/components/ui/text';
import { ScrollView } from 'react-native';
import { VStack } from '@/src/components/ui/vstack';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/src/components/ui/checkbox';
import { Card } from '@/src/components/ui/card';
import { HStack } from '@/src/components/ui/hstack';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Dispatch } from 'react';
import { Link } from 'expo-router';

interface ExerciseModalProps {
  isOpen: boolean;
  handleClose: () => void;
  exercises: Tables<'exercises'>[];
  setSelectedExercises: Dispatch<React.SetStateAction<string[]>>;
  selectedExercises: string[];
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
            <Center className="flex min-h-full">
              <Spinner size="large" color={colors.red[700]} />
            </Center>
          ) : (
            <CheckboxGroup value={selectedExercises} onChange={setSelectedExercises}>
              <Text className="mb-4 text-lg">Selecione os exercicios:</Text>
              <ScrollView className="h-full">
                <VStack space="md">
                  {!exercises?.length && (
                    <>
                      <Text>Nenhum exercicio cadastrado. Por favor, crie alguns</Text>
                    </>
                  )}
                  {exercises.map((item) => {
                    return (
                      <Checkbox value={item.name} key={item.id}>
                        <Card variant="elevated" className="w-full rounded-xl bg-gray-700">
                          <HStack className="items-center gap-2">
                            <CheckboxIndicator>
                              <CheckboxIcon as={CheckIcon} className="text-red-700" size="lg" />
                            </CheckboxIndicator>
                            <CheckboxLabel className="text-bold text-lg text-white">
                              {item.name}
                            </CheckboxLabel>
                          </HStack>
                        </Card>
                      </Checkbox>
                    );
                  })}
                </VStack>
              </ScrollView>
            </CheckboxGroup>
          )}
        </ModalBody>
        <ModalFooter className="pb-2">
          <Button className="flex-1 rounded-xl bg-red-700" size="xl" onPress={handleClose}>
            <ButtonText className="text-white">Fechar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import { Container } from '@/src/components/Container';
import { CustomButton } from '@/src/components/CustomButton';
import { Loading } from '@/src/components/Loading';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { Box } from '@/src/components/ui/box';
import { Card } from '@/src/components/ui/card';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/src/components/ui/checkbox';
import { Heading } from '@/src/components/ui/heading';
import { HStack } from '@/src/components/ui/hstack';

import { Text } from '@/src/components/ui/text';
import { useBottomTab } from '@/src/contexts/bottomTabContext';
import {
  completeTraining,
  getTrainingDetails,
  getTrainingExercises,
} from '@/src/services/training';
import { router } from 'expo-router';
import { CheckIcon, PencilLine, Trash2 } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import Animated, { FadeIn, FadeOut, Easing } from 'react-native-reanimated';
import { CompleteModal } from './CompleteModal';
import { useCustomToast } from '@/src/hooks/toast';
import { useModal } from '@/src/hooks/useModal';
import { DeleteModal } from './DeleteModal';
import { OptionsMenu, OptionsMenuItem } from '@/src/components/OptionsMenu';
import { deleteTraining } from '../../../services/training';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useHideBottomTab } from '@/src/hooks/useHideBottomTab';
import { queryClient } from '@/src/configs/queryClient';

interface TrainingDetailsTemplateProps {
  id: string;
}

type CompletingState = 'default' | 'loading' | 'success' | 'error';

export const TrainingDetailsTemplate = ({ id }: TrainingDetailsTemplateProps) => {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [completedModalWasOpenedButNotCompleted, setCompletedModalWasOpenedButNotCompleted] =
    useState(false);
  const [isCompletingState, setIsCompletingState] = useState<CompletingState>('default');

  const {
    data: trainingDetailsResponse,
    isLoading: trainingDetailsLoading,
    isSuccess: trainingDetailsSuccess,
  } = useQuery({
    queryKey: ['training-detail', id],
    queryFn: () => getTrainingDetails(id),
  });

  const {
    data: trainingResponse,
    isLoading: trainingLoading,
    isSuccess: trainingSuccess,
  } = useQuery({
    queryKey: ['training-exercises', id],
    queryFn: () => getTrainingExercises(id),
  });

  const {
    isOpen: isDeleteModalOpen,
    handleOpen: handleOpenDeleteModal,
    handleClose: handleCloseDeleteModal,
  } = useModal();

  const deleteTrainingMutation = useMutation({
    mutationFn: deleteTraining,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['trainings'],
      }),
  });

  const { openBottomTab } = useBottomTab();
  const { showNewToast } = useCustomToast();

  useHideBottomTab();

  const handleDeleteTraining = useCallback(async () => {
    try {
      await deleteTrainingMutation.mutateAsync(id);
      showNewToast('Treino apagado com sucesso!');
      router.navigate('/(app)/(tabs)/training');
    } catch (error) {
      console.error(error);
      showNewToast('Ocorreu um erro inesperado! Por favor, tente novamente!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChangeSelectExercises = (data: string[]) => {
    setCompletedExercises(data);

    if (data.length === trainingData.length) {
      setCompletedModalWasOpenedButNotCompleted(false);
      setIsCompletedModalOpen(true);
    }
  };

  const onCloseSuccessModal = () => {
    setIsCompletedModalOpen(false);
    setCompletedModalWasOpenedButNotCompleted(true);
  };

  const onComplete = async (instModal?: boolean) => {
    try {
      setIsCompletingState('loading');
      await completeTraining({
        id: trainingDetails?.id!,
        completed_count: (trainingDetails?.completed_count || 0) + 1,
      });
      setIsCompletingState('success');
      if (instModal) {
        setIsCompletedModalOpen(true);
      }
    } catch (error) {
      setIsCompletingState('error');
      showNewToast('Ocorreu um erro inesperado! Por favor, tente novamente!');
      setCompletedModalWasOpenedButNotCompleted(true);
      setIsCompletedModalOpen(false);
    }
  };

  const onFinish = () => router.navigate('/(app)/(tabs)/training');

  const isLoading = trainingDetailsLoading && trainingLoading;
  const isCompleted = trainingDetailsSuccess && trainingSuccess;

  const isCompleting = isCompletingState === 'loading';

  const itemOptions = useMemo<OptionsMenuItem[]>(
    () => [
      {
        key: 'edit',
        name: 'Editar',
        icon: PencilLine,
        action: () => router.push(`/(app)/(tabs)/training/edit/${id}`),
      },
      {
        key: 'delete',
        name: 'Apagar',
        labelClassname: 'text-red-700',
        icon: Trash2,
        action: handleOpenDeleteModal,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Container animate className="h-full">
      {isLoading && <Loading />}
      {isCompleted && (
        <Box className="flex flex-1 flex-col justify-between">
          <CheckboxGroup value={completedExercises} onChange={onChangeSelectExercises}>
            <FlatList
              ListHeaderComponent={
                <ScreenHeader
                  title={trainingDetailsResponse?.data?.name || ''}
                  description={`Completado: ${trainingDetailsResponse?.data?.completed_count} vezes`}
                  rightComponent={<OptionsMenu items={itemOptions} />}
                  goBackRoute="(app)/(tabs)/training"
                  goBackCallback={() => openBottomTab()}
                />
              }
              data={trainingResponse?.data || []}
              keyExtractor={(data) => data.id.toString()}
              contentContainerClassName="gap-4 px-4"
              stickyHeaderIndices={[0]}
              renderItem={({ item }) => {
                return (
                  <Checkbox value={item.id.toString()}>
                    <Card className="relative w-full bg-slate-700">
                      <HStack className="items-center justify-between">
                        <HStack className="items-center gap-2">
                          <CheckboxIndicator>
                            <CheckboxIcon as={CheckIcon} className="text-red-700" size="lg" />
                          </CheckboxIndicator>
                          <CheckboxLabel className="text-bold text-lg text-white">
                            {item.exercises?.name}
                          </CheckboxLabel>
                        </HStack>

                        <HStack className="gap-2">
                          <Text>Reps/Series:</Text>
                          <Text className="text-bold text-white">
                            {item.reps || 0} x {item.series}
                          </Text>
                        </HStack>
                      </HStack>

                      {completedExercises.includes(item.id.toString()) && (
                        <Animated.View
                          className="absolute bottom-0 left-0 right-0 top-0 rounded bg-black-rgba"
                          entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
                          exiting={FadeOut.duration(300).easing(Easing.inOut(Easing.quad))}
                        >
                          <Heading className="mx-auto mb-auto mt-auto">Completo</Heading>
                        </Animated.View>
                      )}
                    </Card>
                  </Checkbox>
                );
              }}
            />
          </CheckboxGroup>

          {completedModalWasOpenedButNotCompleted && (
            <HStack className="items-center justify-center pb-14">
              <CustomButton
                action="primary"
                text="Completar"
                size="xl"
                disabled={isCompleting}
                isLoading={isCompleting}
                onPress={() => onComplete(true)}
              />
            </HStack>
          )}

          <DeleteModal
            isOpen={isDeleteModalOpen}
            onCancel={handleCloseDeleteModal}
            onConfirm={handleDeleteTraining}
            isLoading={deleteTrainingMutation.isPending}
          />

          <CompleteModal
            isOpen={isCompletedModalOpen}
            isCompleted={isCompleted}
            isCompleting={isCompleting}
            onClose={onCloseSuccessModal}
            onFinish={onFinish}
            onComplete={onComplete}
          />
        </Box>
      )}
    </Container>
  );
};

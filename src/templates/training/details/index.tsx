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
import { TrainingDetails, TrainingExercises } from '@/src/services/types';
import { router, useFocusEffect } from 'expo-router';
import { CheckIcon, PencilLine, Trash2 } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import Animated, { FadeIn, FadeOut, Easing } from 'react-native-reanimated';
import { CompleteModal } from './CompleteModal';
import { useCustomToast } from '@/src/hooks/toast';
import { useModal } from '@/src/hooks/useModal';
import { DeleteModal } from './DeleteModal';
import { OptionsMenu, OptionsMenuItem } from '@/src/components/OptionsMenu';
import { deleteTraining } from '../../../services/training';

interface TrainingDetailsTemplateProps {
  id: string;
}

type DetailState = 'loading' | 'loaded' | 'error';
type CompletingState = 'default' | 'loading' | 'success' | 'error';

export const TrainingDetailsTemplate = ({ id }: TrainingDetailsTemplateProps) => {
  const [detailsState, setDetailsState] = useState<DetailState>('loading');
  const [trainingData, setTrainingData] = useState<TrainingExercises[]>([]);
  const [trainingDetails, setTrainingDetails] = useState<TrainingDetails | null>();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [completedModalWasOpenedButNotCompleted, setCompletedModalWasOpenedButNotCompleted] =
    useState(false);
  const [isCompletingState, setIsCompletingState] = useState<CompletingState>('default');
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    isOpen: isDeleteModalOpen,
    handleOpen: handleOpenDeleteModal,
    handleClose: handleCloseDeleteModal,
  } = useModal();

  const { isOpen, closeBottomTab, openBottomTab } = useBottomTab();
  const { showNewToast } = useCustomToast();

  const getData = useCallback(async () => {
    try {
      const trainingDetailsResponse = await getTrainingDetails(id);

      const response = await getTrainingExercises(id);

      setTrainingData(response.data || []);
      setTrainingDetails(trainingDetailsResponse.data);

      setDetailsState('loaded');
    } catch (error) {
      console.error(error);
      setDetailsState('error');
    }
  }, [id]);

  const handleDeleteTraining = useCallback(async () => {
    try {
      setIsDeleting(true);
      await deleteTraining(id);
      showNewToast('Treino apagado com sucesso!');
      router.navigate('/(app)/(tabs)/training');
    } catch (error) {
      console.error(error);
      showNewToast('Ocorreu um erro inesperado! Por favor, tente novamente!');
    } finally {
      setIsDeleting(false);
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

  useFocusEffect(
    useCallback(() => {
      if (isOpen) {
        closeBottomTab();
      }
      getData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData]),
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const isCompleting = isCompletingState === 'loading';
  const isCompleted = isCompletingState === 'success';

  const itemOptions = useMemo<OptionsMenuItem[]>(
    () => [
      {
        key: 'edit',
        name: 'Editar',
        icon: PencilLine,
        action: () => router.navigate(`/(app)/(tabs)/training/edit/${id}`),
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
      {detailsState === 'loading' && <Loading />}
      {detailsState === 'loaded' && (
        <Box className="flex flex-1 flex-col justify-between">
          <CheckboxGroup value={completedExercises} onChange={onChangeSelectExercises}>
            <FlatList
              ListHeaderComponent={
                <ScreenHeader
                  title={trainingDetails?.name || ''}
                  description={`Completado: ${trainingDetails?.completed_count} vezes`}
                  rightComponent={<OptionsMenu items={itemOptions} />}
                  goBackRoute="(app)/(tabs)/training"
                  goBackCallback={() => openBottomTab()}
                />
              }
              data={trainingData}
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
            isLoading={isDeleting}
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

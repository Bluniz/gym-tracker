import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { Card } from '@/src/components/ui/card';
import { Center } from '@/src/components/ui/center';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/src/components/ui/checkbox';
import { Heading } from '@/src/components/ui/heading';
import { HStack } from '@/src/components/ui/hstack';
import { Spinner } from '@/src/components/ui/spinner';
import { Text } from '@/src/components/ui/text';
import { useBottomTab } from '@/src/contexts/bottomTabContext';
import { getTrainingDetails, getTrainingExercises } from '@/src/services/training';
import { TrainingDetails, TrainingExercises } from '@/src/services/types';
import { useFocusEffect } from 'expo-router';
import { CheckIcon } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Animated, { FadeIn, FadeOut, Easing } from 'react-native-reanimated';

import colors from 'tailwindcss/colors';

interface TrainingDetailsTemplateProps {
  id: string;
}

type DetailState = 'loading' | 'loaded' | 'error';

export const TrainingDetailsTemplate = ({ id }: TrainingDetailsTemplateProps) => {
  const [detailsState, setDetailsState] = useState<DetailState>('loading');
  const [trainingData, setTrainingData] = useState<TrainingExercises[]>([]);
  const [trainingDetails, setTrainingDetails] = useState<TrainingDetails | null>();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const { isOpen, openBottomTab, closeBottomTab } = useBottomTab();

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

  useFocusEffect(
    useCallback(() => {
      if (isOpen) {
        closeBottomTab();
      }
      getData();
      return () => {
        openBottomTab();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData]),
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container animate className="h-full">
      {detailsState === 'loading' && (
        <Center className="h-full w-full">
          <Spinner size="large" color={colors.red[700]} />
        </Center>
      )}
      {detailsState === 'loaded' && (
        <CheckboxGroup value={completedExercises} onChange={setCompletedExercises}>
          <FlatList
            ListHeaderComponent={<ScreenHeader title={trainingDetails?.name || ''} />}
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
                        className="bg-black-rgba absolute bottom-0 left-0 right-0 top-0 rounded"
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
      )}
    </Container>
  );
};

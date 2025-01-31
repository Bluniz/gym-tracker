import { Container } from '@/src/components/Container';
import { ScreenHeader } from '@/src/components/ScreenHeader';
import { Center } from '@/src/components/ui/center';
import { Spinner } from '@/src/components/ui/spinner';
import { getTrainingExercises } from '@/src/services/training';
import { TrainingExercises } from '@/src/services/types';
import { useCallback, useEffect, useState } from 'react';
import colors from 'tailwindcss/colors';

interface TrainingDetailsTemplateProps {
  id: string;
}

type DetailState = 'loading' | 'loaded' | 'error';

export const TrainingDetailsTemplate = ({ id }: TrainingDetailsTemplateProps) => {
  const [detailsState, setDetailsState] = useState<DetailState>('loading');
  const [trainingData, setTrainingData] = useState<TrainingExercises[]>([]);

  const getData = useCallback(async () => {
    try {
      const response = await getTrainingExercises(id);
      setTrainingData(response.data || []);

      setDetailsState('loaded');
    } catch (error) {
      console.error(error);
      setDetailsState('error');
    }
  }, [id]);

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
        <ScreenHeader title={trainingData?.[0]?.training?.name || ''} />
      )}
    </Container>
  );
};

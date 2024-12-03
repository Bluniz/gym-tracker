import { Container } from '@/src/components/Container';
import { Text } from '@/src/components/ui/text';
import { useState } from 'react';

interface TrainingDetailsTemplateProps {
  id: string;
}

type DetailState = 'loading' | 'loaded' | 'error';

export const TrainingDetailsTemplate = ({ id }: TrainingDetailsTemplateProps) => {
  const [detailsState, setDetailsState] = useState<DetailState>('loading');

  return (
    <Container animate className="h-full">
      <Text>{id}</Text>
    </Container>
  );
};

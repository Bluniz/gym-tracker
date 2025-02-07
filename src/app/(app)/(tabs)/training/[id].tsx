import { TrainingDetailsTemplate } from '@/src/templates/training/details';
import { useLocalSearchParams } from 'expo-router';

export default function TrainingDetails() {
  const { id } = useLocalSearchParams();

  return <TrainingDetailsTemplate id={id as string} />;
}

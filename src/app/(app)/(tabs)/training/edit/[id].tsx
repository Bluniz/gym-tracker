import { EditTrainingTemplate } from '@/src/templates/training/edit';
import { useLocalSearchParams } from 'expo-router';

export default function EditTraining() {
  const { id } = useLocalSearchParams();

  return <EditTrainingTemplate id={id as string} />;
}

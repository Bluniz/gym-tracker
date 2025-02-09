import { EditExerciseTemplate } from '@/src/templates/exercises/edit';
import { useLocalSearchParams } from 'expo-router';

export default function EditExerciseScreen() {
  const { id } = useLocalSearchParams();

  return <EditExerciseTemplate id={id as string} />;
}

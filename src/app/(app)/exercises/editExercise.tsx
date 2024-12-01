import { EditExerciseTemplate } from '@/src/templates/editExercise';
import { useLocalSearchParams } from 'expo-router';

export default function EditExerciseScreen() {
  const { id } = useLocalSearchParams();

  return <EditExerciseTemplate id={id as string} />;
}

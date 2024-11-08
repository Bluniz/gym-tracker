import { Box } from '@/src/components/ui/box';
import { Text } from '@/src/components/ui/text';
import Constants from 'expo-constants';

export default function CreateExerciseScreen() {
  return (
    <Box style={{ paddingTop: Constants.statusBarHeight }}>
      <Text>Criar</Text>
    </Box>
  );
}

import { Center } from '@/src/components/ui/center';
import { Spinner } from '@/src/components/ui/spinner';
import colors from 'tailwindcss/colors';

export const ExerciseLoading = () => {
  return (
    <Center className="flex-1">
      <Spinner size="large" color={colors.red[700]} />
    </Center>
  );
};

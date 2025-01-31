import colors from 'tailwindcss/colors';
import { Center } from './ui/center';
import { Spinner } from './ui/spinner';

export const Loading = () => {
  return (
    <Center className="h-full w-full">
      <Spinner size="large" color={colors.red[700]} />
    </Center>
  );
};

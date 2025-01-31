import colors from 'tailwindcss/colors';
import { Center } from './ui/center';
import { Spinner } from './ui/spinner';
import { ViewProps } from 'react-native';
import clsx from 'clsx';

interface LoadingProps {
  className?: ViewProps['className'];
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <Center className={clsx('h-full w-full', className)}>
      <Spinner size="large" color={colors.red[700]} />
    </Center>
  );
};

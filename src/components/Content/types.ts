import { ReactNode } from 'react';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

export interface ContentProps extends SafeAreaViewProps {
  children: ReactNode
}
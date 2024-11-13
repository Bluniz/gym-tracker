import { Box, IBoxProps } from './ui/box';
import Constants from 'expo-constants';

interface ContainerProps extends IBoxProps {}

export function Container(props: ContainerProps) {
  return <Box {...props} style={{ paddingTop: Constants.statusBarHeight }} />;
}

import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { Box, IBoxProps } from './ui/box';
import Constants from 'expo-constants';

interface ContainerProps extends IBoxProps {
  animate?: boolean;
  animateDuration?: number;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

export function Container({ animate, animateDuration = 300, ...props }: ContainerProps) {
  return (
    <AnimatedBox
      {...props}
      style={{ paddingTop: Constants.statusBarHeight }}
      {...(animate && {
        entering: FadeIn.duration(animateDuration).easing(Easing.inOut(Easing.quad)),
        exiting: FadeOut.duration(animateDuration).easing(Easing.inOut(Easing.quad)),
      })}
    />
  );
}

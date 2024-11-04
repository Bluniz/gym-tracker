import clsx from 'clsx';
import { Button, ButtonIcon, IButtonProps } from './ui/button';
import { useEffect } from 'react';
import { LucideIcon } from 'lucide-react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface TabBarButton extends IButtonProps {
  isFocused: boolean;
  icon: LucideIcon;
  label: string;
}

export const TabBarButton = ({
  label,
  isFocused,
  icon,
  testID,
  onPress,
  onLongPress,
}: TabBarButton) => {
  const scale = useSharedValue(0);
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return { opacity };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 10]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    });
  }, [scale, isFocused]);

  return (
    <Button
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      className={clsx('flex-1 flex-col items-center justify-center bg-transparent')}
      variant="link"
    >
      <Animated.View style={animatedIconStyle}>
        <ButtonIcon as={icon} className={clsx('h-[18] w-[18] color-white')} />
      </Animated.View>
      <Animated.Text className={clsx('text-[12] color-white')} style={animatedTextStyle}>
        {label}
      </Animated.Text>
    </Button>
  );
};

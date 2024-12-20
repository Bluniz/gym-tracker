import clsx from 'clsx';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Hourglass, LucideIcon } from 'lucide-react-native';
import { TabBarButton } from './TabBarButton';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  withDelay,
} from 'react-native-reanimated';
import colors from 'tailwindcss/colors';
import { useBottomTab } from '../contexts/bottomTabContext';

export const BottomTabBar = ({ navigation, state, descriptors }: BottomTabBarProps) => {
  const { isOpen } = useBottomTab();

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 }); // Initial Values

  const buttonWidth = dimensions.width / state.routes.length;

  const tabOpacity = useSharedValue(1);
  const animatedtabOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(tabOpacity.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      tabOpacity.value = tabOpacity.value = withDelay(100, withTiming(1));
    } else {
      tabOpacity.value = tabOpacity.value = withDelay(100, withTiming(0));
    }
  }, [isOpen, tabOpacity]);

  return (
    <Animated.View
      style={[animatedtabOpacityStyle]}
      onLayout={onTabBarLayout}
      className={clsx(
        'absolute bottom-[50] mx-[80] flex-row items-center justify-between rounded-[35] bg-slate-700 py-[18] shadow-sm',
      )}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            backgroundColor: colors.red[700],
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const icon = options.tabBarIcon ? options.tabBarIcon : Hourglass;
        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            icon={icon as LucideIcon}
            label={label as string}
          />
        );
      })}
    </Animated.View>
  );
};

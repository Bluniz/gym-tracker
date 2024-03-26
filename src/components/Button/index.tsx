import {Text, StyleSheet, Pressable, PressableProps} from 'react-native';
import {Loading} from '../Loading';
import {styles} from './styles';
import {currentTheme} from '../../styles/theme';

interface ButtonPrps extends PressableProps {
  title?: string;
  isLoading?: boolean;
  variant?: 'default' | 'outlined';
  size?: 'md' | 'lg';
}

const sizes = {
  md: styles.md,
  lg: styles.lg,
};

const variants = {
  default: styles.button,
  outlined: styles.outlined,
};

export function Button({
  title,
  onPress,
  isLoading,
  disabled,
  children,
  style,
  variant = 'default',
  size = 'lg',
  ...rest
}: ButtonPrps) {
  return (
    <Pressable
      {...rest}
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        variants[variant],
        sizes[size],
        pressed ? {opacity: 0.9} : {},
        style,
        disabled
          ? {
              opacity: 0.5,
            }
          : {},
        style,
      ]}>
      {isLoading ? (
        <Loading size="small" color={currentTheme.colors.white} />
      ) : (
        <>
          {children ? children : <Text style={styles.buttonText}>{title}</Text>}
        </>
      )}
    </Pressable>
  );
}

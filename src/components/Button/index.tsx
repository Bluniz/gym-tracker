import {Text, StyleSheet, Pressable, PressableProps} from 'react-native';
import {currentTheme} from '../../styles/theme';
import {Loading} from '../Loading';

interface ButtonPrps extends PressableProps {
  title?: string;
  isLoading?: boolean;
}

export function Button({
  title,
  onPress,
  isLoading,
  disabled,
  children,
  style,
  ...rest
}: ButtonPrps) {
  return (
    <Pressable
      {...rest}
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        pressed ? {opacity: 0.9} : {},
        rest.style,
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

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: currentTheme.colors.primary,

    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: currentTheme.colors.white,
  },
});

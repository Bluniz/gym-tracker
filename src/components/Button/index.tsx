import {Text, StyleSheet, Pressable, PressableProps} from 'react-native';
import {currentTheme} from '../../styles/theme';

interface ButtonPrps extends PressableProps {
  title: string;
}

export function Button({title, onPress, ...rest}: ButtonPrps) {
  return (
    <Pressable
      {...rest}
      onPress={onPress}
      style={({pressed}) => [styles.button, pressed ? {opacity: 0.9} : {}]}>
      <Text style={styles.buttonText}>{title}</Text>
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

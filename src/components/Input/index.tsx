import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {currentTheme} from '../../styles/theme';

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={currentTheme.colors.backgroundLight}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    padding: 16,
    backgroundColor: currentTheme.colors.backgroundMedium,
    color: currentTheme.colors.text,
    shadowOpacity: 0,
    borderRadius: 6,
  },
});

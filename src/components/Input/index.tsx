import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Theme } from '../../styles/theme';

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={Theme.colors.gray100}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    padding: 16,
    backgroundColor: Theme.colors.black500,
    color: Theme.colors.white,
    shadowOpacity: 0,
    borderRadius: 6,
  },
});

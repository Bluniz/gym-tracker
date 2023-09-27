import { TextInput, StyleSheet, TextInputProps, Keyboard } from 'react-native';

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  return (
    <TextInput {...props} style={styles.input} placeholderTextColor='#7C7C8A' />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    padding: 16,
    backgroundColor: '#121214',
    color: '#7C7C8A',
    shadowOpacity: 0,
    borderRadius: 6,
  },
});

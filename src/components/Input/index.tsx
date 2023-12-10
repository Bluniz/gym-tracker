import {LegacyRef, forwardRef} from 'react';
import {TextInput, View, Text} from 'react-native';
import {currentTheme} from '../../styles/theme';
import {styles} from './styles';
import {InputProps} from './types';

function InputComponent(
  props: InputProps,
  ref: LegacyRef<TextInput> | undefined
) {
  const {
    width,
    height,
    maxWidth,
    maxHeight,
    label,
    errorMessage,
    flex,
    ...rest
  } = props;

  const dimensionStyles = {
    width,
    height,
    maxWidth,
    maxHeight,
    flex,
  };
  return (
    <View style={[styles.container, dimensionStyles]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...rest}
        ref={ref}
        style={[styles.input, props.style]}
        placeholderTextColor={currentTheme.colors.backgroundLight}
        autoCapitalize="none"
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

export const Input = forwardRef(InputComponent);

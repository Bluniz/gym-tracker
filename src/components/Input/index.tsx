import {TextInput, View, Text} from 'react-native';
import {ReactElement} from 'react';
import {currentTheme} from '../../styles/theme';
import {styles} from './styles';
import {InputProps} from './types';

import {Controller, FieldValues} from 'react-hook-form';
import {LegacyRef, forwardRef} from 'react';

export const Input = forwardRef(
  <T extends FieldValues>(
    props: InputProps<T>,
    ref: LegacyRef<TextInput> | undefined
  ) => {
    const {
      width,
      height,
      maxWidth,
      maxHeight,
      label,
      errorMessage,
      flex,
      control,
      name,
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
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={[styles.container, dimensionStyles]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
              {...rest}
              style={[styles.input, props.style]}
              placeholderTextColor={currentTheme.colors.backgroundLight}
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
        )}
      />
    );
  }
) as <T extends FieldValues>(
  p: InputProps<T> & {ref?: LegacyRef<TextInput> | undefined}
) => ReactElement;

import {forwardRef} from 'react';
import {TextInput} from 'react-native';
import {currentTheme} from '../../styles/theme';
import {styles} from './styles';
import {InputProps} from './types';
import reactotron from 'reactotron-react-native';

function InputComponent(props: InputProps, ref) {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor={currentTheme.colors.backgroundLight}
      autoCapitalize="none"
    />
  );
}

export const Input = forwardRef(InputComponent);

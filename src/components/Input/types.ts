import {DimensionValue, TextInputProps} from 'react-native';

export interface InputProps extends TextInputProps {
  width?: DimensionValue;
  maxWidth?: DimensionValue;
  height?: DimensionValue;
  maxHeight?: DimensionValue;
  flex?: number;

  label?: string;
  errorMessage?: string;
}

import {Control, FieldValues, Path} from 'react-hook-form';
import {DimensionValue, TextInputProps} from 'react-native';

export interface InputProps<T extends FieldValues> extends TextInputProps {
  width?: DimensionValue;
  maxWidth?: DimensionValue;
  height?: DimensionValue;
  maxHeight?: DimensionValue;
  flex?: number;

  label?: string;
  errorMessage?: string;

  control: Control<T>;
  name: Path<T>;
}

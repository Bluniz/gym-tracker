import {Text, View, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {styles} from './styles';
import {useState} from 'react';
import {currentTheme} from '../../styles/theme';

interface CheckboxProps {
  onChange?: () => void;
  check?: boolean;
}

export const Checkbox = ({onChange, check = false}: CheckboxProps) => {
  const [checked, setIsChecked] = useState(check);

  return (
    <Pressable
      onPress={() => {
        setIsChecked(prevState => !prevState);
        onChange?.();
      }}
      style={[styles.container, checked && styles.checked]}>
      {checked && (
        <Ionicons
          name="checkmark"
          size={16}
          color={currentTheme.colors.green}
        />
      )}
    </Pressable>
  );
};

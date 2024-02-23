import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import {styles} from './styles';
import {Ionicons} from '@expo/vector-icons';
import {currentTheme} from '../../styles/theme';

interface AddButtonProps extends TouchableOpacityProps {}

export const AddButton = ({onPress}: AddButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Ionicons name="add" color={currentTheme.colors.white} size={20} />
      </View>
    </TouchableOpacity>
  );
};

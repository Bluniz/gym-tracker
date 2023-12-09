import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  input: {
    height: 56,
    padding: 16,
    backgroundColor: currentTheme.colors.backgroundMedium,
    color: currentTheme.colors.text,
    shadowOpacity: 0,
    borderRadius: 6,
  },
});

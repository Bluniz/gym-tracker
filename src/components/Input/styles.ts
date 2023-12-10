import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    gap: 4,
    minHeight: 95,
  },

  input: {
    maxHeight: 56,
    minHeight: 56,
    height: 56,
    padding: 16,
    backgroundColor: currentTheme.colors.backgroundMedium,
    color: currentTheme.colors.text,
    shadowOpacity: 0,
    borderRadius: 6,
  },

  label: {
    color: currentTheme.colors.text,
    paddingLeft: 4,
  },
  error: {
    color: currentTheme.colors.primary,
    fontSize: 12,
    paddingLeft: 4,
  },
});

import { StyleSheet } from 'react-native';
import { currentTheme } from '../../styles/theme';

export const styles = StyleSheet.create({
  exerciseContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: currentTheme.colors.primary,
    padding: 8,
    gap: 4,
  },
  exerciseTitle: {
    fontSize: 18,
  },
  exerciseReps: {
    color: currentTheme.colors.primary,
  },
  exercisesWeight: {
    color: currentTheme.colors.primary,
  },
  weightContainer: {
    flexDirection: 'row',
    gap: 16,
  },
});
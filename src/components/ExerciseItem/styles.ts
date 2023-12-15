import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: currentTheme.colors.primary,
    overflow: 'hidden',
  },
  exerciseContainer: {
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
    gap: 6,
    flexWrap: 'wrap',
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: currentTheme.colors.primary,
  },
  editBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: currentTheme.colors.primaryLight,
  },
  actionIcon: {
    marginHorizontal: 10,
  },
});

import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    overflow: 'hidden',
    backgroundColor: currentTheme.colors.backgroundMedium,
    borderRadius: 8,
    padding: 12,

  },
  exerciseContainer: {
    padding: 8,
    gap: 4,
  },
  exerciseTitle: {
    fontSize: 18,
    color: currentTheme.colors.text
  },
  exerciseReps: {
    color: currentTheme.colors.text,
  },
  exercisesWeight: {
    color: currentTheme.colors.text,
  },
  weightContainer: {
    gap: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: currentTheme.colors.primary,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8

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

import {StyleSheet} from 'react-native';
import { currentTheme } from '../../styles/theme';

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const workoutItemStyles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 148,
    backgroundColor: currentTheme.colors.backgroundMedium,
    borderRadius: 8,

    padding: 8,
    paddingHorizontal: 16,
    position: 'relative',

    marginVertical: 8,
  },

  itemBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemFooter: {},
  itemTitle: {
    color: currentTheme.colors.text,
    fontSize: 24,
    textAlign: 'center',
    ...currentTheme.typography.bold

  },
  itemDoneText: {
    position: 'absolute',
    fontSize: 12,
    color: currentTheme.colors.text,
    bottom: 0,
    ...currentTheme.typography.regular

  },
});

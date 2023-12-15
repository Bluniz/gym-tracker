import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

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
    borderColor: currentTheme.colors.primary,
    borderWidth: 1,
    padding: 8,
    position: 'relative',
    borderRadius: 4,

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
    fontWeight: 'bold',
  },
  itemDoneText: {
    position: 'absolute',
    fontSize: 12,
    color: currentTheme.colors.text,
    bottom: 0,
  },
});

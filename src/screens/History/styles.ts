import { StyleSheet } from 'react-native';
import { currentTheme } from '../../styles/theme';


export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  historyItemContainer: {
    backgroundColor: currentTheme.colors.backgroundMedium,
    borderRadius: 8,
    padding: 12,
  }
});
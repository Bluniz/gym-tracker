import { StyleSheet } from 'react-native';
import { currentTheme } from '../../styles/theme';



export const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: currentTheme.colors.backgroundMedium,
    borderRadius: 8,
    gap: 4
  },
  list: {
    flex: 1, gap: 8
  }
});
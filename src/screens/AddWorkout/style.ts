import {StyleSheet} from "react-native"
import { currentTheme } from '../../styles/theme';

export const styles = StyleSheet.create({
  listTitle: {
    fontSize: 18,
    color: currentTheme.colors.text,
    ...currentTheme.typography.regular,
  },
  container: {
    flex: 1,
    paddingBottom: 8,
    gap: 8,
    justifyContent: 'space-between'
  },
  listContent: {
    gap: 8,
    paddingVertical: 8,
    paddingBottom: 20
  },
  listTitleContainer: {
    paddingVertical: 8,
    backgroundColor: currentTheme.colors.background,
  }
 
})
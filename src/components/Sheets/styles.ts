import {StyleSheet} from "react-native"
import { currentTheme } from "../../styles/theme"

export const styles = StyleSheet.create({
  container: {
    height: 'auto', 
    backgroundColor: currentTheme.colors.backgroundMedium,
    gap: 8,
    borderTopEndRadius: 24,
    borderTopLeftRadius: 24
  },
  wrapper: {
    backgroundColor: 'transparent'
  },
  optionContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsTitle: {
    fontSize: 16
  },
  borderBottom: {
    borderBottomWidth: 0.2,
    borderBottomColor: currentTheme.colors.backgroundLight
  },
  default: {
    color: currentTheme.colors.text,
  },
  destructive: {
    color: currentTheme.colors.primary,
  }
})
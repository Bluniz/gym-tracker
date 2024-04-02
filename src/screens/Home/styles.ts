import {StyleSheet} from "react-native"
import { currentTheme } from "../../styles/theme"

export const styles = StyleSheet.create({

  text: {
    color: currentTheme.colors.text,
    fontSize: 18,
    textAlign: 'center',
    ...currentTheme.typography.regular,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 18
  }
})
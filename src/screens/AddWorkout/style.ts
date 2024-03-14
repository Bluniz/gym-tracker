import {StyleSheet} from "react-native"
import { currentTheme } from "../../styles/theme"

export const styles = StyleSheet.create({
  listTitle: {
     fontSize: 18,
    color: currentTheme.colors.text
  },
  container: {
    flex: 1,
    paddingBottom: 8,
    gap: 8,
    justifyContent: 'space-between'
  },
  listContent: {
    gap: 8,
    paddingVertical: 8
  },
  listTitleContainer: {
    paddingVertical: 8,
    backgroundColor: currentTheme.colors.background,
  }
 
})
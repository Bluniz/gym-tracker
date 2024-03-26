import {StyleSheet} from "react-native"
import { currentTheme } from "../../styles/theme"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24
  },
  logoContainer:{
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  actionContainer: {
    width: '100%',
    gap: 16
  },
  text: {
    color: currentTheme.colors.text,
    fontSize: 36,
    fontWeight: 'bold'
  }
})
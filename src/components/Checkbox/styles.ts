import {StyleSheet} from "react-native"
import { currentTheme } from '../../styles/theme';


export const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: currentTheme.colors.backgroundLight,
    alignItems:"center",
    justifyContent: 'center',
    borderRadius: 4
  },

  checked: {
    borderColor: currentTheme.colors.green
  }

  

})
import { StyleSheet } from 'react-native';
import { currentTheme } from '../../styles/theme';



export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: currentTheme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});
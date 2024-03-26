import { StyleSheet} from 'react-native';

import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: currentTheme.colors.primary,

    paddingHorizontal: 12,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: currentTheme.colors.white,
  },

  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: currentTheme.colors.primary,
    
    paddingHorizontal: 12,
    borderRadius: 6,
     textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  md: {
     paddingVertical: 12,
  },
  lg: {
    paddingVertical: 20,

  }
  
});

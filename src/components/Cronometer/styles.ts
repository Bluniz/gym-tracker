import {StyleSheet} from 'react-native';
import { currentTheme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: currentTheme.colors.primaryLight,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
    
  },

  counterActionsContainer: {
    flexDirection: 'row',
    gap: 6,
  },

  actionBtn: {
    backgroundColor: currentTheme.colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  
  },

  actionBtnDisabled: {
    opacity: 0.5
  },

  whiteText: {
    color: currentTheme.colors.white,  
  },


});
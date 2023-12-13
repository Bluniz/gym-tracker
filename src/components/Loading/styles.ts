import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    backgroundColor: currentTheme.colors.black50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

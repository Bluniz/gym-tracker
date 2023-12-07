import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: currentTheme.colors.black500,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: currentTheme.colors.black500,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  closeButton: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginTop: 8,
  },
  content: {
    backgroundColor: currentTheme.colors.background,
    width: '80%',
    height: '30%',
    borderRadius: 8,
  },
  header: {
    alignItems: 'flex-end',
  },
  body: {
    flex: 1,
  },
});

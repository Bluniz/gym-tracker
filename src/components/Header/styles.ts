import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    position: 'relative',
    paddingTop: 12,
    marginBottom: 16
  },
  iconBtn: {
    position: 'absolute',
    top: 18,
    left: 24,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    color: currentTheme.colors.text,

  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  headerTitle: {
    color: currentTheme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: currentTheme.colors.primary,
    fontSize: 12,
  },
});

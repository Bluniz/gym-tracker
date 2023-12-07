import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    position: 'relative',
    marginTop: 16,
  },
  iconBtn: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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

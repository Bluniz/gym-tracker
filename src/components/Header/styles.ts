import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    marginHorizontal: 24,
    borderBottomColor: currentTheme.colors.primaryLight,

  },
  iconBtn: {
    position: 'absolute',
    left: 0,
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

import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    marginHorizontal: 24,
    borderBottomColor: currentTheme.colors.primaryLight,

  },
  
  disabledIconBtn: {
    opacity: 0.5
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  headerTitle: {
    color: currentTheme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
   
  },
  headerSubtitle: {
    color: currentTheme.colors.primary,
    fontSize: 12,
  },
 
});

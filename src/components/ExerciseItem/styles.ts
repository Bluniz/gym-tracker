import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: currentTheme.colors.backgroundMedium,
    borderRadius: 8,
    
    gap: 8,
    height: 300

  },
  container2: {
    overflow: 'hidden',
    backgroundColor: currentTheme.colors.backgroundMedium,
    borderRadius: 8,
    
    gap: 8,

  },
  exerciseImage: {
    height: 200,
    resizeMode: 'cover',
    aspectRatio: 1.6
    
  },
  open: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  exerciseContainer: {
    padding: 12,
    paddingBottom: 18,
    gap: 4,
    alignItems: 'center'
  },
  
  
  exerciseTitle: {
    fontSize: 24,
    color: currentTheme.colors.text,
    fontFamily: currentTheme.typography.bold.fontFamily,
    fontWeight: currentTheme.typography.bold.fontWeight
  },
  exerciseReps: {
    color: currentTheme.colors.text,
    fontFamily: currentTheme.typography.regular.fontFamily,

  },
  exercisesWeight: {
    color: currentTheme.colors.text,
  },
  weightContainer: {
    gap: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
 
});

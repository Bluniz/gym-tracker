import {StyleSheet} from 'react-native';
import {currentTheme} from '../../styles/theme';

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    gap: 36,
    marginBottom: 36
  },
  
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  title: {
    marginTop: 'auto',
    textAlign: 'center',
    color: currentTheme.colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    gap: 12,
    marginTop: 'auto',
        paddingBottom: 24

  }
});

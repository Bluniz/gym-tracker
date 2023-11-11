import {View, StyleSheet} from 'react-native';
import {PropsWithChildren} from 'react';
import {currentTheme} from '../../styles/theme';

interface BackgroundProps {}

export const Background = ({children}: PropsWithChildren<BackgroundProps>) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: currentTheme.colors.background,
    width: '100%',
    height: '100%',
  },
});

import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {PropsWithChildren} from 'react';
import {currentTheme} from '../../styles/theme';

interface ContainerProps {}

export const Container = ({children}: PropsWithChildren<ContainerProps>) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: currentTheme.colors.background,
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

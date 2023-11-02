import { View, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { Theme } from '../../styles/theme';


interface BackgroundProps {}

export const Background = ({children}: PropsWithChildren<BackgroundProps>) => {

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.gray500,
    width: '100%',
    height: '100%'
  }
});
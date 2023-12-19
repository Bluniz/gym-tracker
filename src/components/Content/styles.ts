import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: Platform.select({
      ios: 100,
      android: 0,
    }),

    flex: 1,
  },
});

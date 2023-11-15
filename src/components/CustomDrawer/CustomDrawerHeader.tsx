import React from 'react';
import {StyleSheet, View} from 'react-native';
import {currentTheme} from '../../styles/theme';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
import {IconButton} from '../IconButton';

interface DrawerHeaderProps {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
}

export const DrawerHeader = ({navigation}: DrawerHeaderProps) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="md-menu"
        onPress={() => navigation.openDrawer()}
        style={styles.iconContainer}
        size={24}
        color="primary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-end',
    backgroundColor: currentTheme.colors.background,
  },
  iconContainer: {
    paddingTop: 16,
    paddingRight: 16,
  },
});

import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {currentTheme} from '../../styles/theme';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';

interface DrawerHeaderProps {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
}

export const DrawerHeader = ({navigation}: DrawerHeaderProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.iconContainer}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="md-menu" size={24} color="red" />
      </Pressable>
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
    backgroundColor: currentTheme.colors.background,
  },
  iconContainer: {
    paddingTop: 16,
    paddingLeft: 16,
  },
});

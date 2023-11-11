import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from '../components/CustomDrawer';
import {TrainingTabRoutes} from './TrainingTabRoutes';
import {DrawerHeader} from '../components/CustomDrawer/CustomDrawerHeader';
import {currentTheme} from '../styles/theme';

const Drawer = createDrawerNavigator();

export const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        header: ({navigation}) => {
          return <DrawerHeader navigation={navigation} />;
        },
        drawerActiveBackgroundColor: currentTheme.colors.primaryLight,
        drawerActiveTintColor: currentTheme.colors.white,
      }}>
      <Drawer.Screen name="Treino" component={TrainingTabRoutes} />
    </Drawer.Navigator>
  );
};

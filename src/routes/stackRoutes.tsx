import {createStackNavigator} from '@react-navigation/stack';

import {Login} from '../screens/Login';
import {DrawerRoutes} from './drawerRoutes';
import {currentTheme} from '../styles/theme';

const Stack = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: currentTheme.colors.background,
        },
      }}>
      <Stack.Screen name="signIn" component={Login} />
      <Stack.Screen name="app" component={DrawerRoutes} />
    </Stack.Navigator>
  );
};

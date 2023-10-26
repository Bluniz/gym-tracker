import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Login } from '../screens/Login';
import { DrawerRoutes } from './drawerRoutes';
import { useAuth } from '../contexts/auth';

const Stack = createStackNavigator();

export const StackRoutes = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      navigation.navigate('app' as never);
    } else {
      navigation.navigate('signIn' as never);
    }
  }, [user, navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name='signIn' component={Login} />
      <Stack.Screen name='app' component={DrawerRoutes} />
    </Stack.Navigator>
  );
};

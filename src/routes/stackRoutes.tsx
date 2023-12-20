import {createStackNavigator} from '@react-navigation/stack';

import {Login} from '../screens/Login';
import {currentTheme} from '../styles/theme';
import {AppTabRoutes} from './AppTabRoutes';

const Stack = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: currentTheme.colors.background,
        },
      }}>
      <Stack.Screen name="signIn" component={Login} />
      <Stack.Screen
        name="app"
        component={AppTabRoutes}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

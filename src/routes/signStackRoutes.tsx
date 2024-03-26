import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screens/Login';
import {currentTheme} from '../styles/theme';
import {SignHome} from '../screens/SignHome';

const Stack = createStackNavigator();

export const SignStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="signHome"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: currentTheme.colors.background,
        },
      }}>
      <Stack.Screen name="signHome" component={SignHome} />
      <Stack.Screen name="signIn" component={Login} />
      <Stack.Screen name="signUp" component={Login} />
      <Stack.Screen name="register" component={Login} />
    </Stack.Navigator>
  );
};

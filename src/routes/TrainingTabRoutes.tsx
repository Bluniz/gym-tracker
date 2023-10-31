import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { Theme } from '../styles/theme';

const Tab = createBottomTabNavigator();

export const TrainingTabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: {
        backgroundColor: Theme.colors.gray500
      }}}
      initialRouteName='Home'
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Teste' component={Home} />
    </Tab.Navigator>
  );
};

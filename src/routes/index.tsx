import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';

const Tab = createBottomTabNavigator();

export const Routes = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Teste' component={Home} />
    </Tab.Navigator>
  );
};

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screens/Home';
import {currentTheme} from '../styles/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {TrainingScreen} from '../screens/Training';

const Tab = createBottomTabNavigator();

export const TrainingTabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarLabelStyle: {
          color: currentTheme.colors.text,
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: currentTheme.colors.background,
          paddingVertical: 8,
          height: 60,
          borderColor: currentTheme.colors.primary,
        },
      }}
      initialRouteName="Training">
      <Tab.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          tabBarIcon: props => {
            return <MaterialCommunityIcons name="dumbbell" {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={Home}
        options={{
          tabBarIcon: props => {
            return <MaterialCommunityIcons name="bike" {...props} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

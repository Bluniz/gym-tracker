import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {currentTheme} from '../styles/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {WorkoutStackRoutes} from './workoutStackRoutes';
import {ExercisesStackRoutes} from './exercisesStackRoutes';

const Tab = createBottomTabNavigator();

export const AppTabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarLabelStyle: {
          color: currentTheme.colors.text,
          fontSize: 14,
          marginBottom: 4
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
        component={WorkoutStackRoutes}
        options={{
          tabBarIcon: props => {
            return <MaterialCommunityIcons name="dumbbell" {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={ExercisesStackRoutes}
        options={{
          tabBarIcon: props => {
            return <MaterialCommunityIcons name="bike" {...props} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

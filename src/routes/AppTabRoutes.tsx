import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {currentTheme} from '../styles/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {WorkoutStackRoutes} from './workoutStackRoutes';
import {ExercisesStackRoutes} from './exercisesStackRoutes';
import {HistoryScreen} from '../screens/History';

const Tab = createBottomTabNavigator();

export const AppTabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: currentTheme.colors.backgroundMedium,
          elevation: 0,
          borderTopWidth: 0,
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
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: props => {
            return <MaterialCommunityIcons name="history" {...props} />;
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

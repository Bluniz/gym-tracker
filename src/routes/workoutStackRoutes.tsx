import {createStackNavigator} from '@react-navigation/stack';
import {currentTheme} from '../styles/theme';
import {WorkoutScreen} from '../screens/Workout';
import {WorkoutDetailsScreen} from '../screens/WorkoutDetails';

const Stack = createStackNavigator();

export const WorkoutStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="workouts"
      screenOptions={{
        headerShown: false,

        cardStyle: {
          backgroundColor: currentTheme.colors.background,
        },
      }}>
      <Stack.Screen
        name="workouts"
        component={WorkoutScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="workoutDetails"
        component={WorkoutDetailsScreen}
        initialParams={{id: null}}
      />
    </Stack.Navigator>
  );
};

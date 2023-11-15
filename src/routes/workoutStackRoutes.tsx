import {createStackNavigator} from '@react-navigation/stack';
import {currentTheme} from '../styles/theme';
import {TrainingScreen} from '../screens/Training';
import {Workout} from '../screens/Workout';

const Stack = createStackNavigator();

export const WorkoutStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="workouts"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: currentTheme.colors.background,
        },
      }}>
      <Stack.Screen name="workouts" component={TrainingScreen} />
      <Stack.Screen
        name="workout"
        component={Workout}
        initialParams={{id: null}}
      />
    </Stack.Navigator>
  );
};

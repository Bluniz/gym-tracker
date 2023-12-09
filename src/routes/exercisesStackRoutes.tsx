import {createStackNavigator} from '@react-navigation/stack';
import {currentTheme} from '../styles/theme';
import {ExercisesScreen} from '../screens/Exercises';
import {AddExercisesScreen} from '../screens/AddExercises';

const Stack = createStackNavigator();

export const ExercisesStackRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="listExercises"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: currentTheme.colors.background,
        },
      }}>
      <Stack.Screen name="listExercises" component={ExercisesScreen} />
      <Stack.Screen name="addExercises" component={AddExercisesScreen} />
    </Stack.Navigator>
  );
};

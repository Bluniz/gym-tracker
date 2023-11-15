import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {WorkoutParamsList} from '../types/workout';

export const useWorkoutStackNavigation = () =>
  useNavigation<StackNavigationProp<WorkoutParamsList>>();

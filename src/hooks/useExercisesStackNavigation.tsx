import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ExercisesParamslist} from '../types/exercises';

export const useExercisesStackNavigation = () =>
  useNavigation<StackNavigationProp<ExercisesParamslist>>();

import {View, Text, TouchableOpacity} from 'react-native';

import {useWorkoutStackNavigation} from '../../hooks';
import {WorkoutItemProps} from './types';
import {workoutItemStyles} from './styles';

export const WorkoutItem = ({workout}: WorkoutItemProps) => {
  const navigation = useWorkoutStackNavigation();

  const handleGoToWorkout = () => {
    navigation.navigate('workout', {
      id: workout.id,
    });
  };

  return (
    <TouchableOpacity onPress={() => handleGoToWorkout()}>
      <View style={[workoutItemStyles.listItem]}>
        <View style={workoutItemStyles.itemBody}>
          <Text style={workoutItemStyles.itemTitle}>{workout.name}</Text>
        </View>
        <View style={workoutItemStyles.itemFooter}>
          <Text style={workoutItemStyles.itemDoneText}>
            Done: {workout.complete_qtd} times
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

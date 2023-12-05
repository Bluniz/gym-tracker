import {  View, Text } from 'react-native';
import { WorkoutItemProps } from './types';
import { styles } from './styles';


export const ExerciseItem = ({data}: WorkoutItemProps) => {
  const exercise = data.item;
  return (
    
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseTitle}>{exercise?.name}</Text>
      <View style={styles.weightContainer}>
        <Text style={styles.exerciseReps}>Reps: {exercise.reps || 0} x {exercise.series || 0}</Text>
        <Text style={styles.exercisesWeight}>Weight: {exercise?.weight}</Text>
        {exercise.last_weight < exercise.weight && <Text>Aumentou</Text>}
        
      </View>
    </View>
  );
};


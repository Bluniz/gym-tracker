import {View, Text, Animated} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useShallow} from 'zustand/react/shallow';

import {WorkoutItemProps} from './types';
import {styles} from './styles';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {currentTheme} from '../../styles/theme';
import Toast from 'react-native-root-toast';
import {deleteExercise} from '../../services';
import {useStore} from '../../stores';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const ExerciseItem = ({data}: WorkoutItemProps) => {
  const exercise = data.item;
  const {startLoading, finishLoading} = useStore(
    useShallow(state => ({
      startLoading: state.startLoading,
      finishLoading: state.finishLoading,
    }))
  );
  const handleDeleteExercise = async () => {
    try {
      startLoading();
      await deleteExercise(exercise.id);
      Toast.show('Exercise deleted!');
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
    } finally {
      finishLoading();
    }
  };

  const renderRightActions = () => {
    return (
      <RectButton style={styles.deleteBtn} onPress={handleDeleteExercise}>
        <AnimatedIcon
          name="trash"
          size={22}
          style={[styles.actionIcon, {transform: [{translateX: 0}]}]}
          color={currentTheme.colors.white}
        />
      </RectButton>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={41}>
      <View style={styles.container}>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>{exercise?.name}</Text>
          <View style={styles.weightContainer}>
            <Text style={styles.exerciseReps}>
              Reps: {exercise.reps || 0} x {exercise.series || 0}
            </Text>
            <Text style={styles.exercisesWeight}>
              Weight: {exercise?.weight}
            </Text>
            {/* {exercise.last_weight < exercise.weight && <Text>Aumentou</Text>} */}
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

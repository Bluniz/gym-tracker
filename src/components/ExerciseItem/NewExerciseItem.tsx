import {View, Text, Animated, Alert, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {WorkoutItemProps} from './types';
import {styles} from './styles';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {currentTheme} from '../../styles/theme';

import {Button} from '../Button';
import {useState} from 'react';
import {Checkbox} from '../Checkbox';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const NewExerciseItem = ({
  data,
  handleDelete,
  handleEdit,
  onSelect,
  isSelected,
}: WorkoutItemProps) => {
  const exercise = data.item;
  const [isOpen, setIsOpen] = useState(false);

  const confirmAlert = () =>
    Alert.alert(
      'Are you sure you want to delete this exercise?',
      'This item will be deleted',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete?.(exercise.id),
        },
      ]
    );

  return (
    <View style={[styles.container, isOpen && styles.open]}>
      <Image
        source={require('../../../assets/demo-img.jpg')}
        style={styles.exerciseImage}
      />
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>{exercise?.name}</Text>
        <View style={styles.weightContainer}>
          <Text style={styles.exerciseReps}>
            Reps: {exercise.reps || 0} x {exercise.series || 0}
          </Text>
          {/* <Text style={styles.exercisesWeight}>Peso: {exercise?.weight}kg</Text> */}
          {/* {exercise.last_weight < exercise.weight && <Text>Aumentou</Text>} */}
        </View>
      </View>
    </View>
  );
};

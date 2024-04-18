import {View, Text, Animated, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import {WorkoutItemProps} from './types';
import {styles} from './styles';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {currentTheme} from '../../styles/theme';

import {Button} from '../Button';
import {useState} from 'react';
import {Checkbox} from '../Checkbox';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export const ExerciseItem = ({
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

  const renderRightActions = () => {
    return (
      <>
        {handleDelete && (
          <Button style={styles.deleteBtn} onPress={confirmAlert}>
            <AnimatedIcon
              name="trash"
              size={22}
              style={[styles.actionIcon, {transform: [{translateX: 0}]}]}
              color={currentTheme.colors.white}
            />
          </Button>
        )}
        {handleEdit && (
          <RectButton
            style={styles.editBtn}
            onPress={() => handleEdit(exercise)}>
            <AnimatedIcon
              name="pencil"
              size={22}
              style={[styles.actionIcon, {transform: [{translateX: 0}]}]}
              color={currentTheme.colors.white}
            />
          </RectButton>
        )}
      </>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      onSwipeableWillOpen={() => setIsOpen(true)}
      onSwipeableWillClose={() => setIsOpen(false)}
      rightThreshold={0}>
      <View style={[styles.container2, isOpen && styles.open]}>
        {onSelect && <Checkbox onChange={onSelect} check={isSelected} />}
        <View
          style={[
            styles.exerciseContainer,
            {alignItems: 'flex-start', paddingHorizontal: 16},
          ]}>
          <Text style={[styles.exerciseTitle, {fontSize: 18}]}>
            {exercise?.name}
          </Text>
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

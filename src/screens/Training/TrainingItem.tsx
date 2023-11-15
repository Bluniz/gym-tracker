import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {currentTheme} from '../../styles/theme';

import {useWorkoutStackNavigation} from '../../hooks/useWorkoutStackNavigation';

interface TrainingItemProps {
  title: string;
  doneQtd?: number;
  id: string;
}

export const TrainingItem = ({title, doneQtd = 0, id}: TrainingItemProps) => {
  const navigation = useWorkoutStackNavigation();

  const handleGoToWorkout = () => {
    navigation.navigate('workout', {
      id,
    });
  };

  return (
    <TouchableOpacity onPress={() => handleGoToWorkout()}>
      <View style={styles.listItem}>
        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <View style={styles.itemFooter}>
          <Text style={styles.itemDoneText}>Done: {doneQtd} times</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 148,
    borderColor: currentTheme.colors.primary,
    borderWidth: 1,
    padding: 8,
    position: 'relative',
    borderRadius: 4,
  },

  itemBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemFooter: {},
  itemTitle: {
    color: currentTheme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemDoneText: {
    position: 'absolute',
    fontSize: 12,
    color: currentTheme.colors.text,
    bottom: 0,
  },
});

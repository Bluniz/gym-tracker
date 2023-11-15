import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import {
  Workout as WorkoutProps,
  WorkoutScreenRouteProp,
} from '../../types/workout';
import {Header} from '../../components/Header';
import {currentTheme} from '../../styles/theme';
import {useEffect, useState} from 'react';
import {getWorkout} from '../../services/workouts';

export const Workout = () => {
  const {params} = useRoute<WorkoutScreenRouteProp>();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState<WorkoutProps>();

  useEffect(() => {
    (async () => {
      const data = await getWorkout(params!.id);
      setWorkoutData(data);
      setIsLoading(false);
    })();
  }, [params]);

  return (
    <View>
      <Header
        title={isLoading ? '' : workoutData!.name}
        subTitle={
          isLoading ? '' : `Complete: ${workoutData!.complete_qtd} time`
        }
        enableGoBack
        onGoBackPress={navigation.goBack}
      />

      <View>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>Supino Reto</Text>

          <View style={styles.weightContainer}>
            <Text style={styles.exerciseReps}>Reps: 3 x 12</Text>
            <Text style={styles.exercisesWeight}>Weight: 30kg</Text>
            <Text>Aumentou</Text>
          </View>
        </View>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>Supino Reto</Text>

          <View style={styles.weightContainer}>
            <Text style={styles.exerciseReps}>Reps: 3 x 12</Text>
            <Text style={styles.exercisesWeight}>Weight: 30kg</Text>
            <Text>Aumentou</Text>
          </View>
        </View>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>Supino Reto</Text>

          <View style={styles.weightContainer}>
            <Text style={styles.exerciseReps}>Reps: 3 x 12</Text>
            <Text style={styles.exercisesWeight}>Weight: 30kg</Text>
            <Text>Aumentou</Text>
          </View>
        </View>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>Supino Reto</Text>

          <View style={styles.weightContainer}>
            <Text style={styles.exerciseReps}>Reps: 3 x 12</Text>
            <Text style={styles.exercisesWeight}>Weight: 30kg</Text>
            <Text>Aumentou</Text>
          </View>
        </View>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>Supino Reto</Text>

          <View style={styles.weightContainer}>
            <Text style={styles.exerciseReps}>Reps: 3 x 12</Text>
            <Text style={styles.exercisesWeight}>Weight: 30kg</Text>
            <Text>Aumentou</Text>
          </View>
        </View>
      </View>

      {isLoading && (
        <ActivityIndicator size="large" color={currentTheme.colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: currentTheme.colors.primary,
    padding: 8,
    gap: 4,
  },
  exerciseTitle: {
    fontSize: 18,
  },
  exerciseReps: {
    color: currentTheme.colors.primary,
  },
  exercisesWeight: {
    color: currentTheme.colors.primary,
  },
  weightContainer: {
    flexDirection: 'row',
    gap: 16,
  },
});

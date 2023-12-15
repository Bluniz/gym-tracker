import {TouchableOpacity, View} from 'react-native';
import {Container} from '../../components/Container';
import {currentTheme} from '../../styles/theme';

import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Header} from '../../components/Header';

import {Content} from '../../components/Content';
import {Ionicons} from '@expo/vector-icons';
import {useShallow} from 'zustand/react/shallow';

import {useExercisesStackNavigation} from '../../hooks/useExercisesStackNavigation';
import {Loading} from '../../components';
import {styles} from './styles';
import {useStore} from '../../stores';
import {ExerciseList} from './ExerciseList';
import {Exercise} from '../../types/exercises';

export const ExercisesScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useExercisesStackNavigation();

  const {exercises, getExercises, isLoading} = useStore(
    useShallow(state => ({
      exercises: state.exercises,
      isLoading: state.isExercisesLoading,
      getExercises: state.getExercises,
    }))
  );

  const handleEditExercise = (data: Exercise) => {
    navigation.navigate('addExercises', data);
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await getExercises();
      })();
    }
  }, [isFocused, getExercises]);

  return (
    <Container>
      <Header title="Exercises" />

      <Content>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        ) : (
          <>
            <ExerciseList
              exercises={exercises}
              handleEditExercise={handleEditExercise}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('addExercises')}>
              <View style={styles.buttonContainer}>
                <Ionicons
                  name="add"
                  color={currentTheme.colors.white}
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </>
        )}
      </Content>
    </Container>
  );
};

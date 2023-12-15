import {FlatList, TouchableOpacity, View} from 'react-native';
import {Container} from '../../components/Container';
import {currentTheme} from '../../styles/theme';

import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Header} from '../../components/Header';
import {Exercise} from '../../types/exercises';
import {listExercises} from '../../services/exercises';
import {useLoading} from '../../hooks/useLoading';
import {ExerciseItem} from '../../components/ExerciseItem';
import {Content} from '../../components/Content';
import {Ionicons} from '@expo/vector-icons';

import {useExercisesStackNavigation} from '../../hooks/useExercisesStackNavigation';
import {Loading} from '../../components';
import {styles} from './styles';

export const ExercisesScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const {isLoading, handleStartLoading, handleFinishLoading} = useLoading();
  const isFocused = useIsFocused();
  const navigation = useExercisesStackNavigation();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          handleStartLoading();
          const data = await listExercises();
          setExercises(data || []);
        } catch (error) {
          console.log(error);
        } finally {
          handleFinishLoading();
        }
      })();
    }
  }, [isFocused, handleFinishLoading, handleStartLoading]);

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
            <FlatList
              data={exercises}
              keyExtractor={(item, index) => `${item.name}__${index}`}
              renderItem={item => <ExerciseItem data={item} />}
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

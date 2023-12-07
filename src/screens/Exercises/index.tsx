import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
          handleFinishLoading();
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
        {isLoading && (
          <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        )}
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => `${item.name}__${index}`}
          renderItem={item => <ExerciseItem data={item} />}
        />
      </Content>

      <TouchableOpacity onPress={() => navigation.navigate('addExercises')}>
        <View style={styles.buttonContainer}>
          <Ionicons name="add" color={currentTheme.colors.white} size={20} />
        </View>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: currentTheme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});

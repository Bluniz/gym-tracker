import {  FlatList, ActivityIndicator } from 'react-native';
import {Container} from '../../components/Container';
import { currentTheme } from '../../styles/theme';

import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Exercise } from '../../types/exercises';
import { listExercises } from '../../services/exercises';
import { useLoading } from '../../hooks/useLoading';
import { ExerciseItem } from '../../components/ExerciseItem';
import { Content } from '../../components/Content';


export const ExercisesScreen = () => {

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const {isLoading,handleStartLoading, handleFinishLoading } = useLoading();
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
      (async () => {
        try {
          handleStartLoading();
          const data = await listExercises();
          setExercises(data || []);
          console.log('setDat');
        }catch(error) {
          console.log(error);
          handleFinishLoading();
        } finally {
          console.log('finally');
          handleFinishLoading();
        }
      
      })();
    }
    
  }, [isFocused, handleFinishLoading, handleStartLoading]);


  return (
    <Container>
      <Header
        title="Exercises"
          
      />
      <Content> 
        {isLoading && (
          <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        )}
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => `${item.name}__${index}`}
          renderItem={(item) => <ExerciseItem data={item}/>}
        />
      </Content>
    </Container>
  );
};

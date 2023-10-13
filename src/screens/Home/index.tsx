import { Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createUser, logIn } from '../../services/users';
import { useAuth } from '../../contexts/auth';
import {
  createExercises,
  listExercises,
  deleteExercise,
  updateExercise,
} from '../../services/exercises';

import * as WorkoutService from '../../services/workouts';

export function Home() {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <Text>Welcome</Text>
      <Button title='Sair' onPress={signOut} />
      <Button
        title='Criar exercicios'
        onPress={() =>
          createExercises({
            name: 'Teste2',
          })
        }
      />
      <Button
        title='Deletar exercicios'
        onPress={() => deleteExercise('7BD1E8ZSGSt0VXC5pPyK')}
      />

      <Button title='Listar Exercicios' onPress={listExercises} />

      <Button
        title='Atualizar Exercicio'
        onPress={() => {
          updateExercise({
            id: 'tJDgzvfzxYAmu6OjvCI4',
            weight: 25,
          });
        }}
      />

      <Button
        title='Criar Treino'
        onPress={() => {
          WorkoutService.createWorkout({
            name: 'Treino A',
            exercices: ['2JvgA6KzmzHV8zZXfuwx', 'tJDgzvfzxYAmu6OjvCI4'],
          });
        }}
      />

      <Button
        title='Atualizar Treino'
        onPress={() => {
          WorkoutService.updateWorkout({
            name: 'Treino A',
            exercices: ['2JvgA6KzmzHV8zZXfuwx'],
            id: 'StwXNrHq3142gY6DjlPy',
          });
        }}
      />
      <Button
        title='Deletar Treino'
        onPress={() => {
          WorkoutService.deleteWorkout('ndbqYR4kvtd041Eg9soc');
        }}
      />
      <Button
        title='Concluir Treino'
        onPress={() => {
          WorkoutService.completeWorkout({
            id: 'DSocaAM1FFylAqbfeovA',
            complete_time: 50,
          });
        }}
      />
    </View>
  );
}

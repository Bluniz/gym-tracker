import { Text, View, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../../contexts/auth';
import {
  createExercises,
  listExercises,
  deleteExercise,
  updateExercise,
} from '../../services/exercises';

import * as WorkoutService from '../../services/workouts';

import {Container} from '../../components/Container';

export function Home() {
  const { signOut } = useAuth();
  return (
    <Container>
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
              name: 'Teste23',
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
          onPress={async () => {
            await updateExercise({
              id: 'tJDgzvfzxYAmu6OjvCI4',
              weight: 25,
            });
          }}
        />

        <Button
          title='Criar Treino'
          onPress={async () => {
            await WorkoutService.createWorkout({
              name: 'Treino AB',
              exercices: ['2JvgA6KzmzHV8zZXfuwx', 'tJDgzvfzxYAmu6OjvCI4'],
            });
          }}
        />

        <Button
          title='Atualizar Treino'
          onPress={async () => {
            await WorkoutService.updateWorkout({
              name: 'Treino A',
              exercices: ['2JvgA6KzmzHV8zZXfuwx'],
              id: 'StwXNrHq3142gY6DjlPy',
            });
          }}
        />
        <Button
          title='Deletar Treino'
          onPress={async () => {
            await WorkoutService.deleteWorkout('ndbqYR4kvtd041Eg9soc');
          }}
        />
        <Button
          title='Concluir Treino'
          onPress={async () => {
            await WorkoutService.completeWorkout({
              id: 'DSocaAM1FFylAqbfeovA',
              complete_time: 50,
            });
          }}
        />
      </View>
    </Container>
  );
}

import {Text, View, FlatList} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {Schema, schema} from './utils';

import {
  Container,
  Header,
  Content,
  Input,
  DismissKeyboard,
  Button,
  ExerciseItem,
  Loading,
  Checkbox,
} from '../../components';
import {useStore} from '../../stores';
import {styles} from './style';
import {currentTheme} from '../../styles/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';

export const AddWorkout = () => {
  const getExercises = useStore(state => state.getExercises);
  const exercises = useStore(state => state.exercises);
  const isLoadingExercises = useStore(state => state.isExercisesLoading);
  const createWorkout = useStore(state => state.createWorkout);

  const navigation = useNavigation();

  const {
    formState: {errors},
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      exercises: [],
    },
  });

  const handleSelect = (id: string) => {
    let data = [...(getValues('exercises') || [])];
    const alreadyAdded = data.includes(id);

    if (alreadyAdded) {
      const index = data.findIndex(item => item === id);
      data.splice(index, 1);
    } else {
      data.push(id);
    }
    setValue('exercises', data);
  };

  const onSubmit = handleSubmit(async data => {
    try {
      await createWorkout({
        title: data.title!,
        exercises: data.exercises || [],
      });
      navigation.navigate('workouts' as never);
    } catch (error) {}
  });

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <Container>
      <Header
        title="Criar Treino"
        enableGoBack
        onGoBackPress={navigation.goBack}
      />
      <Content>
        <DismissKeyboard style={styles.container}>
          <>
            <Input<Schema>
              name="title"
              placeholder="Digite o titulo do seu treino"
              label="Titulo"
              control={control}
              errorMessage={errors?.title?.message}
            />

            {isLoadingExercises ? (
              <Loading />
            ) : (
              <FlatList
                data={exercises}
                keyExtractor={(item, index) => `${item.name}__${index}`}
                showsVerticalScrollIndicator={false}
                scrollEnabled
                contentContainerStyle={styles.listContent}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={() => (
                  <View style={styles.listTitleContainer}>
                    <Text style={styles.listTitle}>
                      Selecione os exercicios:
                    </Text>
                  </View>
                )}
                renderItem={item => (
                  <ExerciseItem
                    data={item}
                    onSelect={() => handleSelect(item.item.id)}
                    isSelected={getValues('exercises')!.includes(item.item.id)}
                  />
                )}
              />
            )}

            <Button
              title="Criar"
              isLoading={isLoadingExercises}
              disabled={isLoadingExercises || Object.keys(errors).length > 0}
              onPress={onSubmit}
            />
          </>
        </DismissKeyboard>
      </Content>
    </Container>
  );
};

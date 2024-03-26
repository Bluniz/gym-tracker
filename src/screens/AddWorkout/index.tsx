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
import {useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {useWorkoutStackNavigation} from '../../hooks';
import {WorkoutWithExercises} from '../../types/workout';

export const AddWorkout = () => {
  const getExercises = useStore(state => state.getExercises);
  const exercises = useStore(state => state.exercises);
  const isLoadingExercises = useStore(state => state.isExercisesLoading);
  const createWorkout = useStore(state => state.createWorkout);
  const updateWorkout = useStore(state => state.updateWorkout);
  const isGlobalLoading = useStore(state => state.isLoading);

  const navigation = useWorkoutStackNavigation();
  const {params} = useRoute();

  const paramsData = params as WorkoutWithExercises;

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
      title: paramsData?.name,
      exercises: paramsData?.exercices.map(item => item.id) || [],
    },
  });

  const isUpdate = Object.keys(paramsData).length > 0;

  const handleSelect = (id: string) => {
    let data = [...(getValues('exercises') || [])];
    const alreadyAdded = data?.includes(id);

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
      if (isUpdate) {
        await updateWorkout({
          name: data.title,
          exercises: data.exercises || [],
          id: paramsData.id,
        });
      } else {
        await createWorkout({
          title: data.title!,
          exercises: data.exercises || [],
        });
      }

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
              title={isUpdate ? 'Atualizar' : 'Criar'}
              isLoading={isLoadingExercises || isGlobalLoading}
              disabled={
                isLoadingExercises ||
                Object.keys(errors).length > 0 ||
                isGlobalLoading
              }
              onPress={onSubmit}
              android_disableSound
            />
          </>
        </DismissKeyboard>
      </Content>
    </Container>
  );
};

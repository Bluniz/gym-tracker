import {View} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {
  Container,
  Header,
  Content,
  Input,
  DismissKeyboard,
  Button,
} from '../../components';
import {useExercisesStackNavigation} from '../../hooks';

import {Schema, schema} from './types';
import {styles} from './styles';
import {useStore} from '../../stores';
import {useShallow} from 'zustand/react/shallow';
import {useRoute} from '@react-navigation/native';
import {CreateExerciseScreenRouteProp} from '../../types/exercises';

export const AddExercisesScreen = () => {
  const navigation = useExercisesStackNavigation();

  const {params} = useRoute<CreateExerciseScreenRouteProp>();

  const {isLoading, createExercises, updateExercise} = useStore(
    useShallow(state => ({
      createExercises: state.createExercise,
      isLoading: state.isLoading,
      updateExercise: state.updateExercise,
    }))
  );

  const {
    formState: {errors},
    handleSubmit,
    control,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      ...params,
    },
  });

  const isUpdate = params && Object.keys(params).length > 0;

  const onSubmit = handleSubmit(async data => {
    isUpdate
      ? await updateExercise({...data, id: params.id}, () =>
          navigation.navigate('listExercises')
        )
      : await createExercises(data, () => navigation.navigate('listExercises'));
  });

  return (
    <Container>
      <Header
        title="Add Exercise"
        enableGoBack
        onGoBackPress={navigation.goBack}
      />
      <Content>
        <DismissKeyboard style={[{flex: 1}, styles.content]}>
          <>
            <Input<Schema>
              placeholder="name"
              label="name"
              editable={!isLoading}
              errorMessage={errors?.name?.message}
              control={control}
              name="name"
            />

            <View style={styles.box}>
              <Input<Schema>
                control={control}
                name="weight"
                placeholder="weight"
                label="Weight"
                style={styles.flex}
                flex={1}
                keyboardType="numeric"
                maxLength={3}
                editable={!isLoading}
                errorMessage={errors?.weight?.message}
              />
              <Input<Schema>
                placeholder="last weight"
                label="Last Weight"
                style={styles.flex}
                keyboardType="numeric"
                flex={1}
                maxLength={3}
                editable={!isLoading}
                errorMessage={errors?.last_weight?.message}
                control={control}
                name="last_weight"
              />
            </View>

            <Input<Schema>
              control={control}
              name="reps"
              placeholder="reps"
              label="Reps"
              keyboardType="numeric"
              maxLength={3}
              editable={!isLoading}
              errorMessage={errors?.reps?.message}
            />

            <Input
              control={control}
              name="series"
              placeholder="series"
              label="Series"
              keyboardType="numeric"
              maxLength={3}
              editable={!isLoading}
              errorMessage={errors?.series?.message}
            />

            <Button
              title={isUpdate ? 'Atualizar' : 'Criar'}
              style={styles.button}
              onPress={onSubmit}
              isLoading={isLoading}
              disabled={isLoading || Object.keys(errors).length > 0}
            />
          </>
        </DismissKeyboard>
      </Content>
    </Container>
  );
};

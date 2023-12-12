import {View} from 'react-native';
import Toast from 'react-native-root-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller} from 'react-hook-form';
import reactotron from 'reactotron-react-native';

import {
  Container,
  Header,
  Content,
  Input,
  DismissKeyboard,
  Button,
} from '../../components';
import {useExercisesStackNavigation, useLoading} from '../../hooks';

import {createExercises} from '../../services';
import {Schema, schema} from './types';
import {styles} from './styles';

export const AddExercisesScreen = () => {
  const navigation = useExercisesStackNavigation();

  const {
    formState: {errors},
    handleSubmit,
    control,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {isLoading, handleStartLoading, handleFinishLoading} = useLoading();

  const onSubmit = handleSubmit(async data => {
    try {
      handleStartLoading();

      await createExercises(data);

      Toast.show('Exercise created!');
      navigation.navigate('listExercises');
    } catch (error) {
      console.log(error);
    } finally {
      handleFinishLoading();
    }
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
              title="Add"
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

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
    reactotron?.log('data', data);
    return;
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

  reactotron?.log(errors);

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
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="name"
                  label="name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                  errorMessage={errors?.name?.message}
                />
              )}
            />

            <View style={styles.box}>
              <Controller
                control={control}
                name="weight"
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="weight"
                    label="Weight"
                    style={styles.flex}
                    flex={1}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    maxLength={3}
                    value={value}
                    onChangeText={onChange}
                    editable={!isLoading}
                    errorMessage={errors?.weight?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="last_weight"
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="last weight"
                    label="Last Weight"
                    style={styles.flex}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    flex={1}
                    maxLength={3}
                    onChangeText={onChange}
                    editable={!isLoading}
                    errorMessage={errors?.last_weight?.message}
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              name="reps"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="reps"
                  label="Reps"
                  onBlur={onBlur}
                  keyboardType="numeric"
                  maxLength={3}
                  value={value}
                  onChangeText={onChange}
                  editable={!isLoading}
                  errorMessage={errors?.reps?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="series"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="series"
                  label="Series"
                  onBlur={onBlur}
                  keyboardType="numeric"
                  value={value}
                  maxLength={3}
                  onChangeText={onChange}
                  editable={!isLoading}
                  errorMessage={errors?.series?.message}
                />
              )}
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

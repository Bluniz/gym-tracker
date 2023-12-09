import {StyleSheet, View} from 'react-native';
import {Container} from '../../components/Container';
import {Header} from '../../components/Header';
import {useExercisesStackNavigation} from '../../hooks/useExercisesStackNavigation';
import {Content} from '../../components/Content';
import {Input} from '../../components/Input';
import {DismissKeyboard} from '../../components/DismissKeyboard';
import {Button} from '../../components/Button';

import {useLoading} from '../../hooks/useLoading';
import {createExercises} from '../../services/exercises';
import Toast from 'react-native-root-toast';

import {useForm, Controller} from 'react-hook-form';
import {CreateExercisesProps} from '../../types/exercises';

export const AddExercisesScreen = () => {
  const navigation = useExercisesStackNavigation();

  const {formState, handleSubmit, watch, control} =
    useForm<CreateExercisesProps>();

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

  const disableSubmit = !watch('name');

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
              rules={{required: true}}
              name="name"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
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
                    style={styles.flex}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    editable={!isLoading}
                  />
                )}
              />

              <Controller
                control={control}
                name="last_weight"
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="last weight"
                    style={styles.flex}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    editable={!isLoading}
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
                  onBlur={onBlur}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  editable={!isLoading}
                />
              )}
            />
            <Controller
              control={control}
              name="series"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="series"
                  onBlur={onBlur}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  editable={!isLoading}
                />
              )}
            />

            <Button
              title="Add"
              style={styles.button}
              onPress={onSubmit}
              isLoading={isLoading}
              disabled={isLoading || disableSubmit}
            />
          </>
        </DismissKeyboard>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 16,
    justifyContent: 'center',
  },
  box: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  button: {
    marginTop: 36,
  },
});

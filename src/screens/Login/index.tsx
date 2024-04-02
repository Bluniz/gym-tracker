import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {
  Button,
  Input,
  Modal,
  DismissKeyboard,
  Loading,
  Container,
  Content,
} from '../../components';

import {styles} from './styles';
import {LoginSchema, loginSchema} from './types';
import {useStore} from '../../stores';
import {useShallow} from 'zustand/react/shallow';

export const Login = () => {
  const {clearError, error, signIn, user, isLoading} = useStore(
    useShallow(state => ({
      signIn: state.signIn,
      clearError: state.clearError,
      user: state.user,
      error: state.authError,
      isLoading: state.authLoading,
    }))
  );

  const {
    formState: {errors},
    handleSubmit,
    control,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const navigation = useNavigation();

  const onSubmit = handleSubmit(data => signIn?.(data));

  return (
    <Container>
      <Content>
        <DismissKeyboard style={styles.container}>
          <>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <Text style={styles.title}>Entrar </Text>
                <Input<LoginSchema>
                  placeholder="Write your e-mail"
                  keyboardType="email-address"
                  name="email"
                  label="E-mail"
                  control={control}
                  errorMessage={errors?.email?.message}
                />
                <Input<LoginSchema>
                  name="password"
                  label="Password"
                  placeholder="Write your password"
                  secureTextEntry
                  control={control}
                  errorMessage={errors?.password?.message}
                />

                <View style={styles.buttonsContainer}>
                  <Button
                    title="Entrar"
                    onPress={onSubmit}
                    disabled={isLoading || Object.keys(errors).length > 0}
                  />
                  <Button
                    title="Voltar"
                    variant="outlined"
                    size="md"
                    onPress={() => navigation.goBack()}
                    disabled={isLoading || Object.keys(errors).length > 0}
                  />
                </View>
              </>
            )}

            <Modal visible={!!error} onRequestClose={clearError}>
              <View style={styles.modal}>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </Modal>
          </>
        </DismissKeyboard>
      </Content>
    </Container>
  );
};

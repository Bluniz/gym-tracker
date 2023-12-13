import {Text, View} from 'react-native';
import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button, Input, Modal, DismissKeyboard, Loading} from '../../components';
import {useAuth} from '../../contexts/auth';

import {styles} from './styles';
import {LoginSchema, loginSchema} from './types';

export const Login = () => {
  const {signIn, isLoading, error, clearError, user} = useAuth();

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

  useLayoutEffect(() => {
    if (user) {
      navigation.navigate('app' as never);
    }
  }, [user, navigation]);

  const onSubmit = handleSubmit(data => signIn?.(data.email, data.password));

  return (
    <DismissKeyboard style={{flex: 1}}>
      <View style={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Text style={styles.title}>Entre com seus dados</Text>

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

            <Button
              title="Entrar"
              onPress={onSubmit}
              disabled={isLoading || Object.keys(errors).length > 0}
            />
          </>
        )}

        <Modal visible={!!error} onRequestClose={clearError}>
          <View style={styles.modal}>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        </Modal>
      </View>
    </DismissKeyboard>
  );
};

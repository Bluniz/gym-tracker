import {View} from 'react-native';
import {Button, Container, Content, Header, Input} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {useForm} from 'react-hook-form';
import {schema, Schema} from './utils';
import {zodResolver} from '@hookform/resolvers/zod';
import Toast from 'react-native-root-toast';
import {createUser} from '../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const SignUpScreen = () => {
  const navigation = useNavigation();

  const {
    formState: {errors},
    handleSubmit,
    control,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = handleSubmit(async data => {
    try {
      await createUser(data.email, data.password, data.display);
      Toast.show('Usuário criado com sucesso!');

      navigation.navigate('signIn' as never);
    } catch (error: any) {
      Toast.show(error?.message! || 'Ocorreu um erro ao criar seu usuário!');
    }
  });

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Content>
          <Header title="Registre-se" />
          <View style={styles.container}>
            <>
              <Input<Schema>
                name="display"
                placeholder="Digite o seu nome"
                label="Nome"
                control={control}
                errorMessage={errors?.display?.message}
              />
              <Input<Schema>
                name="email"
                placeholder="Digite o seu e-mail"
                label="E-mail"
                control={control}
                errorMessage={errors?.email?.message}
              />
              <Input<Schema>
                name="password"
                placeholder="Digite a sua senha"
                label="Senha"
                control={control}
                errorMessage={errors?.email?.message}
              />
            </>
          </View>

          <View style={styles.buttonsContainer}>
            <Button title="Cadastrar" onPress={onSubmit} />
            <Button
              title="Voltar"
              variant="outlined"
              size="md"
              onPress={() => navigation.goBack()}
            />
          </View>
        </Content>
      </KeyboardAwareScrollView>
    </Container>
  );
};

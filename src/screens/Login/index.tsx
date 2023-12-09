import {Text, View, ActivityIndicator} from 'react-native';
import {useState} from 'react';
import {Button} from '../../components/Button/index';
import {Input} from '../../components/Input/index';
import {Modal} from '../../components/Modal';
import {DismissKeyboard} from '../../components/DismissKeyboard';
import {useAuth} from '../../contexts/auth';

import {currentTheme} from '../../styles/theme';
import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, isLoading, error, clearError, user} = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (user) {
      navigation.navigate('app' as never);
    }
  }, [user, navigation]);

  return (
    <DismissKeyboard style={{flex: 1}}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        ) : (
          <>
            <Text style={styles.title}>Entre com seus dados</Text>
            <Input
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Input
              placeholder="Digite sua senha"
              secureTextEntry
              onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={() => signIn?.(email, password)} />
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

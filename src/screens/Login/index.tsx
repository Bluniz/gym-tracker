import { Text, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Button } from '../../components/Button/index';
import { Input } from '../../components/Input/index';
import { DismissKeyboard } from '../../components/DismissKeyboard';
import { useAuth } from '../../contexts/auth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  return (
    <DismissKeyboard style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Entre com seus dados</Text>
        <Input
          placeholder='Digite seu e-mail'
          keyboardType='email-address'
          onChangeText={setEmail}
          placeholderTextColor='#7C7C8A'
        />
        <Input
          placeholder='Digite sua senha'
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor='#7C7C8A'
        />
        <Button title='Entrar' onPress={() => signIn(email, password)} />
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 8,
    backgroundColor: '#202024',
  },
  title: {
    textAlign: 'center',
    color: '#E1E1E6',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
});

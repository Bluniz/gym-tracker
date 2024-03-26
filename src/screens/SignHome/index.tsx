import {Image, Text, View} from 'react-native';
import {Button, Container, Content} from '../../components';
import {styles} from './styles';
import Logo from '../../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';

export const SignHome = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={Logo} width={250} height={250} />

            <Text style={styles.text}>Gym Tracker</Text>
          </View>

          <View style={styles.actionContainer}>
            <Button
              title="Entrar"
              variant="outlined"
              onPress={() => navigation.navigate('signIn' as never)}
            />
            <Button
              title="Cadastrar"
              variant="outlined"
              onPress={() => navigation.navigate('signUp' as never)}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
};

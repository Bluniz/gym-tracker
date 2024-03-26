import {Text, View} from 'react-native';

import {Container, Button, Content} from '../../components';
import {useStore} from '../../stores';
import {styles} from './styles';

export function Home() {
  const signOut = useStore(state => state.signOut);
  const userData = useStore(state => state.user);
  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Olá, {userData?.name}</Text>
            <Text style={styles.text}>{userData?.email}</Text>
          </View>

          <Button title="Sair" onPress={signOut} />
        </View>
      </Content>
    </Container>
  );
}

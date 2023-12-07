import {Text} from 'react-native';
import {Container} from '../../components/Container';
import {Header} from '../../components/Header';
import {useExercisesStackNavigation} from '../../hooks/useExercisesStackNavigation';

export const AddExercisesScreen = () => {
  const navigation = useExercisesStackNavigation();

  return (
    <Container>
      <Header
        title="Add Exercise"
        enableGoBack
        onGoBackPress={navigation.goBack}
      />
      <Text>oi</Text>
    </Container>
  );
};

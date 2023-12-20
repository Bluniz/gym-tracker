import {FlatList, View} from 'react-native';
import {useEffect} from 'react';
import {useShallow} from 'zustand/react/shallow';

import {useNavigation, useRoute} from '@react-navigation/native';

import {WorkoutScreenRouteProp} from '../../types/workout';

import {
  Loading,
  Content,
  ExerciseItem,
  Container,
  Header,
  Cronometer,
} from '../../components';
import {useStore} from '../../stores';

export const WorkoutDetailsScreen = () => {
  const {params} = useRoute<WorkoutScreenRouteProp>();
  const navigation = useNavigation();

  const {getWorkout, isLoading, workout} = useStore(
    useShallow(state => ({
      workout: state.workout,
      isLoading: state.isWorkoutDetailsLoading,
      getWorkout: state.getWorkout,
    }))
  );

  useEffect(() => {
    (async () => {
      await getWorkout(params!.id);
    })();
  }, [params, getWorkout]);

  return (
    <Container>
      <Header
        title={isLoading ? '' : workout?.name || ''}
        subTitle={
          isLoading ? '' : `Complete: ${workout?.complete_qtd || 0} time`
        }
        enableGoBack
        onGoBackPress={navigation.goBack}
      />

      <Content>
        {isLoading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Loading />
          </View>
        ) : (
          <>
            <FlatList
              data={workout?.exercices}
              keyExtractor={(item, index) => `${item.name}__${index}`}
              renderItem={item => <ExerciseItem data={item} />}
            />
            <Cronometer />
          </>
        )}
      </Content>
    </Container>
  );
};

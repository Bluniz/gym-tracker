import {FlatList, View} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import {
  WorkoutWithExercises,
  WorkoutScreenRouteProp,
} from '../../types/workout';
import {useEffect, useState} from 'react';
import {getWorkout} from '../../services/workouts';

import {
  Loading,
  Content,
  ExerciseItem,
  Container,
  Header,
} from '../../components';

export const WorkoutDetailsScreen = () => {
  const {params} = useRoute<WorkoutScreenRouteProp>();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState<WorkoutWithExercises>();

  useEffect(() => {
    (async () => {
      const data = await getWorkout(params!.id);
      setWorkoutData(data);
      setIsLoading(false);
    })();
  }, [params]);

  return (
    <Container>
      <Header
        title={isLoading ? '' : workoutData!.name}
        subTitle={
          isLoading ? '' : `Complete: ${workoutData!.complete_qtd} time`
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
          <FlatList
            data={workoutData?.exercices}
            keyExtractor={(item, index) => `${item.name}__${index}`}
            renderItem={item => <ExerciseItem data={item} />}
          />
        )}
      </Content>
    </Container>
  );
};

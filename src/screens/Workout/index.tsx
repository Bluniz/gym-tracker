import {View} from 'react-native';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useShallow} from 'zustand/react/shallow';

import {useStore} from '../../stores';
import {styles} from './styles';
import {AddButton, Content, Loading, Header, Container} from '../../components';
import {WorkoutList} from './WorkoutList';
import {useBackHandler, useWorkoutStackNavigation} from '../../hooks';

export const WorkoutScreen = () => {
  useBackHandler();
  const {getWorkouts, isLoading, workouts} = useStore(
    useShallow(state => ({
      workouts: state.workouts,
      isLoading: state.isWorkoutsLoading,
      getWorkouts: state.getWorkouts,
    }))
  );

  const navigation = useWorkoutStackNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await getWorkouts();
      })();
    }
  }, [isFocused, getWorkouts]);

  return (
    <Container>
      <Header title="Time for Training" subTitle="Choose your today training" />
      <Content>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Loading />
          </View>
        ) : (
          <WorkoutList workouts={workouts} />
        )}
        <AddButton onPress={() => navigation.navigate('addWorkout')} />
      </Content>
    </Container>
  );
};

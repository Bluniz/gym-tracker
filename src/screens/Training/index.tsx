import {View} from 'react-native';
import {useEffect} from 'react';

import {Container} from '../../components/Container';
import {Header} from '../../components/Header';

import {useIsFocused} from '@react-navigation/native';
import {useStore} from '../../stores';
import {useShallow} from 'zustand/react/shallow';
import {styles} from './styles';
import {Content, Loading} from '../../components';
import {WorkoutList} from './WorkoutList';

export const TrainingScreen = () => {
  const {getWorkouts, isLoading, workouts} = useStore(
    useShallow(state => ({
      workouts: state.workouts,
      isLoading: state.isWorkoutsLoading,
      getWorkouts: state.getWorkouts,
    }))
  );

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
      </Content>
    </Container>
  );
};

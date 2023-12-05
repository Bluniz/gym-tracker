import {View, StyleSheet, ScrollView} from 'react-native';
import {useState, useCallback} from 'react';

import {Container} from '../../components/Container';
import {Header} from '../../components/Header';

import {TrainingItem} from './TrainingItem';
import {listWorkouts} from '../../services/workouts';
import {useFocusEffect} from '@react-navigation/native';
import {DocumentData} from 'firebase/firestore';

export const TrainingScreen = () => {
  const [trainingList, setTrainingList] = useState<DocumentData[]>([]);

  const getList = async () => {
    try {
      const data = await listWorkouts();

      setTrainingList(data || []);
    } catch (error) {
      console.log('error');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getList();
    }, [])
  );

  return (
    <Container>
      <View style={styles.container}>
        <Header
          title="Time for Training"
          subTitle="Choose your today training"
        />

        <ScrollView style={styles.body} contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.list}>
            {trainingList.map(training => {
              return (
                <TrainingItem
                  key={training?.name + Math.random()}
                  title={training.name}
                  doneQtd={training.complete_qtd}
                  id={training?.id}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 38,
  },

  body: {
    paddingHorizontal: 20,
  },

  list: {
    gap: 24,
    paddingBottom: 100,
  },
});

import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useState, useCallback} from 'react';

import {Background} from '../../components/Background';
import {currentTheme} from '../../styles/theme';

import {TrainingItem} from './TrainingItem';
import {listWorkouts} from '../../services/workouts';
import {useFocusEffect} from '@react-navigation/native';
import {DocumentData} from 'firebase/firestore';

export const TrainingScreen = () => {
  const [trainingList, setTrainingList] = useState<DocumentData[]>([]);

  const getList = async () => {
    try {
      const data = await listWorkouts();

      setTrainingList(data);
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
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Time for Training</Text>
          <Text style={styles.headerSubtitle}>Choose your today training </Text>
        </View>
        <ScrollView style={styles.body} contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.list}>
            {trainingList.map(training => {
              return (
                <TrainingItem
                  key={training?.name + Math.random()}
                  title={training.name}
                  doneQtd={training.complete_qtd}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 38,
  },
  header: {
    paddingHorizontal: 36,
  },
  headerTitle: {
    color: currentTheme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: currentTheme.colors.text,
    fontSize: 12,
  },

  body: {
    paddingHorizontal: 20,
  },

  list: {
    gap: 24,
    paddingBottom: 100,
  },
});

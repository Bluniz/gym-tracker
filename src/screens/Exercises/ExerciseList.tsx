import {FlatList, RefreshControl} from 'react-native';
import {ExerciseItem} from '../../components/ExerciseItem/index';
import {Exercise} from '../../types/exercises';
import {useStore} from '../../stores';
import {memo} from 'react';
import {useExercisesStackNavigation} from '../../hooks';
import {useShallow} from 'zustand/react/shallow';
import {currentTheme} from '../../styles/theme';

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseListComponent = ({exercises}: ExerciseListProps) => {
  const navigation = useExercisesStackNavigation();
  const {deleteExercise, getExercises, isRefreshing} = useStore(
    useShallow(state => ({
      deleteExercise: state.deleteExercise,
      isRefreshing: state.isExercisesRefreshing,
      getExercises: state.getExercises,
    }))
  );

  const handleEditExercise = (data: Exercise) => {
    navigation.navigate('addExercises', data);
  };

  return (
    <FlatList
      data={exercises}
      keyExtractor={(item, index) => `${item.name}__${index}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap: 8, paddingBottom: 20}}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          enabled
          onRefresh={async () => {
            await getExercises('refresh');
          }}
          title={isRefreshing ? 'Refreshing' : 'Pull to Refresh'}
          tintColor={currentTheme.colors.primary}
          titleColor={currentTheme.colors.primary}
          colors={[currentTheme.colors.primary]}
        />
      }
      renderItem={item => (
        <ExerciseItem
          data={item}
          handleDelete={deleteExercise}
          handleEdit={handleEditExercise}
        />
      )}
    />
  );
};

export const ExerciseList = memo(ExerciseListComponent);

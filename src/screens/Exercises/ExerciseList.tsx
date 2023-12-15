import {FlatList} from 'react-native';
import {ExerciseItem} from '../../components/ExerciseItem/index';
import {Exercise} from '../../types/exercises';
import {useStore} from '../../stores';
import {memo} from 'react';

interface ExerciseListProps {
  exercises: Exercise[];
  handleEditExercise: (exercise: Exercise) => void;
}

const ExerciseListComponent = ({
  exercises,
  handleEditExercise,
}: ExerciseListProps) => {
  const deleteExercise = useStore(state => state.deleteExercise);

  return (
    <FlatList
      data={exercises}
      keyExtractor={(item, index) => `${item.name}__${index}`}
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

import {WorkoutListProps} from './types';
import {FlatList} from 'react-native-gesture-handler';
import {WorkoutItem} from './WorkoutItem';
import {memo} from 'react';

const WorkoutListComponent = ({workouts}: WorkoutListProps) => {
  return (
    <FlatList
      data={workouts}
      keyExtractor={(item, index) => `${item.name}__${index}`}
      renderItem={data => <WorkoutItem workout={data.item} />}
    />
  );
};

export const WorkoutList = memo(WorkoutListComponent);
